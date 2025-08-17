import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDocClient } from "../../db/db";
import jwt from "jsonwebtoken";
import { User } from "../../db/types/user.type";
import { AUTH_ROLES } from "../../utils/roles";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  // Input validation
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "Email, password and name are required." });
  }

  try {
    const { Item } = await dynamoDocClient.send(
      new GetCommand({
        TableName: "users",
        Key: { email },
      })
    );

    const user = Item as User | undefined;

    if (user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User already exists" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      _id: uuidv4(),
      email,
      password: hashedPassword,
      name,
      createdAt: new Date().toISOString(),
    };

    await dynamoDocClient.send(
      new PutCommand({
        TableName: "users",
        Item: newUser,
        ConditionExpression: "attribute_not_exists(email)",
      })
    );

    const accessToken = jwt.sign(
      {
        _id: newUser._id,
        email: newUser.email,
        role: AUTH_ROLES.USER,
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      {
        _id: newUser._id,
        role: AUTH_ROLES.USER,
      },
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: "4d",
      }
    );

    await dynamoDocClient.send(
      new UpdateCommand({
        TableName: "users",
        Key: { email },
        UpdateExpression: "SET refreshToken = :token",
        ExpressionAttributeValues: {
          ":token": refreshToken,
        },
        ReturnValues: "UPDATED_NEW",
      })
    );

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 4 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Signup successful.",
      });
  } catch (e) {
    console.error("Error during signup:", e);
    res.status(500).json({ message: "An error occurred during signup." });
  }
});
