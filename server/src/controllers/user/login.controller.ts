import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDocClient } from "../../db/db";
import jwt from "jsonwebtoken";
import { User } from "../../db/types/user.type";
import { AUTH_ROLES } from "../../utils/roles";
import bcrypt from "bcrypt";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  // Input validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const { Item } = await dynamoDocClient.send(
      new GetCommand({
        TableName: "users",
        Key: { email },
      })
    );

    const user = Item as User | undefined;

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const accessToken = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: AUTH_ROLES.USER,
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      {
        _id: user._id,
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
        message: "Login successful.",
      });
  } catch (e) {
    console.error("Error during login:", e);
    res.status(500).json({ message: "An error occurred during login." });
  }
});
