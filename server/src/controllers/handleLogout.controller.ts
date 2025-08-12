import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import asyncHandler from "../utils/asyncHandler";
import { AUTH_ROLES } from "../utils/roles";
import { dynamoDocClient } from "../db/db";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

export const handleLogout = (requiredRole: AUTH_ROLES) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (
        (requiredRole == AUTH_ROLES.ADMIN && !req.admin) ||
        (requiredRole == AUTH_ROLES.USER && !req.user)
      ) {
        next(new AppError("UnAuthorized", 401));
        return;
      }

      if (requiredRole == AUTH_ROLES.ADMIN) {
        await dynamoDocClient.send(
          new UpdateCommand({
            TableName: "admins",
            Key: { _id: req.admin?._id },
            UpdateExpression: "REMOVE refreshToken",
            ReturnValues: "ALL_NEW",
          })
        );
      } else if (requiredRole == AUTH_ROLES.USER) {
        await dynamoDocClient.send(
          new UpdateCommand({
            TableName: "users",
            Key: { _id: req.user?._id },
            UpdateExpression: "REMOVE refreshToken",
            ReturnValues: "ALL_NEW",
          })
        );
      }

      const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      };

      return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({ message: "Logout Successfull" });
    }
  );
};
