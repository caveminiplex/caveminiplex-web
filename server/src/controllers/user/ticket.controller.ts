import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { StatusCodes } from "http-status-codes";
import { dynamoDocClient } from "../../db/db";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { Booking } from "../../db/types/booking.type";

export const bookTicket = asyncHandler(async (req: Request, res: Response) => {
  const transactionID: string = req.body.transactionID;
  const movieIds: string[] = req.body.movieIds;

  if (!transactionID) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Transaction ID is not provided" });
  }

  try {
    
  } catch (e) {
    console.log(e);
  }

  res.status(StatusCodes.OK).json({ message: "Movie booked successfully" });
});


export const getBookingById = asyncHandler(async (req: Request, res: Response) => {
  try {
      const { id } = req.params;
      const result = await dynamoDocClient.send(new GetCommand({
          TableName: "bookings",
          Key: {
              _id: id
          }
      }));


      const booking = (result.Item || {}) as Booking;
      res.status(StatusCodes.OK).json({
          message: "Booking fetched successfully",
          data: booking
      });
      
  } catch (err) {
      console.error("Error fetching booking:", err);
      res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Failed to fetch booking" });
  }
});
