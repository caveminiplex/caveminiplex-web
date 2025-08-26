import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { StatusCodes } from "http-status-codes";
import { dynamoDocClient } from "../../db/db";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Booking } from "../../db/types/booking.type";
import { v4 as uuidv4 } from "uuid";

export const bookTicket = asyncHandler(async (req: Request, res: Response) => {
  const {
    transactionId,
    movieIds,
    userId,
    auditorium,
    date,
    noOfPersons,
    location,
    amountPaid,
    slot,
  } = req.body || {};

  if (!transactionId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Transaction ID is not provided" });
  }

  if (!movieIds || !Array.isArray(movieIds) || movieIds.length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "movieIds are required" });
  }

  if (
    !userId ||
    typeof auditorium !== "number" ||
    !date ||
    typeof noOfPersons !== "number" ||
    !location ||
    typeof amountPaid !== "number" ||
    !slot || !slot.startTime || !slot.endTime
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Missing required booking fields" });
  }

  try {
    const newBooking: Booking = {
      _id: uuidv4(),
      transactionId,
      movieIds,
      userId,
      auditorium,
      date,
      noOfPersons,
      location,
      amountPaid,
      slot,
    };

    await dynamoDocClient.send(
      new PutCommand({
        TableName: "bookings",
        Item: newBooking,
      })
    );

    return res.status(StatusCodes.CREATED).json({
      message: "Movie booked successfully",
      bookingId: newBooking._id,
      data: newBooking,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to create booking" });
  }
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
