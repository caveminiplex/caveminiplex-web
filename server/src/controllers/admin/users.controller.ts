import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { StatusCodes } from "http-status-codes";
import { dynamoDocClient } from "../../db/db";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { User } from "../../db/types/user.type";
import { Booking } from "../../db/types/booking.type";

type SafeUser = Omit<User, "password"> & { refreshToken?: never };
type UserWithBookings = SafeUser & {
  bookings: number;
  totalPurchases: number;
};

export const fetchUsers = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      // Fetch all users
      const usersResult = await dynamoDocClient.send(
        new ScanCommand({
          TableName: "users",
        })
      );

      // Fetch all bookings
      const bookingsResult = await dynamoDocClient.send(
        new ScanCommand({
          TableName: "bookings",
        })
      );

      const users = (usersResult.Items || []) as User[];
      const bookings = (bookingsResult.Items || []) as Booking[];

      // Create a map to aggregate booking data by userId
      const userBookingStats = new Map<string, { bookings: number; totalPurchases: number }>();

      // Initialize all users with zero stats
      users.forEach(user => {
        userBookingStats.set(user._id, { bookings: 0, totalPurchases: 0 });
      });

      // Aggregate booking data
      bookings.forEach(booking => {
        const stats = userBookingStats.get(booking.userId);
        if (stats) {
          stats.bookings += 1;
          stats.totalPurchases += booking.amountPaid || 0;
        }
      });

      // Combine user data with booking stats
      const usersWithBookings: UserWithBookings[] = users.map(user => {
        const stats = userBookingStats.get(user._id) || { bookings: 0, totalPurchases: 0 };
        const { password, refreshToken, ...safe } = user as User & { refreshToken?: unknown };
        return {
          ...(safe as SafeUser),
          bookings: stats.bookings,
          totalPurchases: stats.totalPurchases,
        };
      });

      res.status(StatusCodes.OK).json({
        message: "Fetched users successfully",
        data: usersWithBookings,
        totalUsers: usersWithBookings.length,
      });
    } catch (err) {
      console.error("Error fetching users:", err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch users" });
    }
  }
);

