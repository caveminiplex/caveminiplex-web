import AppError from "../utils/appError";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler";
import { AUTH_ROLES } from "../utils/roles";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDocClient } from "../db/db";
import { User } from "../db/types/user.type";
import { Admin } from "../db/types/admin.type";

export const authMiddleware = (requiredRole: AUTH_ROLES) => {
  return asyncHandler(async (req, _, next) => {
    try {
      const token = req.cookies?.accessToken;

      if (!token) {
        throw new AppError("Unauthorized request", 401);
      }

      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as JwtPayload;

      if (decodedToken?.role != requiredRole)
        throw new AppError("Unauthorized request", 401);

      if (requiredRole == AUTH_ROLES.USER) {
        const { Item: user } = await dynamoDocClient.send(
          new GetCommand({
            TableName: "users",
            Key: { id: decodedToken._id },
          })
        );

        if (!user) {
          throw new AppError("Invalid Access Token", 401);
        }

        req.user = user as User;
      } else if (requiredRole == AUTH_ROLES.ADMIN) {
        const { Item: admin } = await dynamoDocClient.send(
          new GetCommand({
            TableName: "admins",
            Key: { id: decodedToken._id },
          })
        );

        if (!admin) {
          throw new AppError("Invalid Access Token", 401);
        }

        req.admin = admin as Admin;
      }

      next();
    } catch (error: any) {
      throw new AppError(error?.message || "Invalid access token", 401);
    }
  });
};
