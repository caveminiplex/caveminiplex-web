import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDocClient } from "../../db/db";
import jwt from "jsonwebtoken";
import { AUTH_ROLES } from "../../utils/roles";
import bcrypt from "bcrypt";
import { Admin } from "../../db/types/admin.type";

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
        TableName: "admins",
        Key: { email },
      })
    );

    const admin = Item as Admin | undefined;

    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const accessToken = jwt.sign(
      {
        _id: admin._id,
        email: admin.email,
        role: AUTH_ROLES.ADMIN,
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      {
        _id: admin._id,
        role: AUTH_ROLES.ADMIN,
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
