import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { StatusCodes } from "http-status-codes";
import { dynamoDocClient } from "../../db/db";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Booking } from "../../db/types/booking.type";
import { v4 as uuidv4 } from "uuid";

// Helper function to check if two time slots overlap
const doSlotsOverlap = (
  slot1Start: string,
  slot1End: string,
  slot2Start: string,
  slot2End: string
): boolean => {
  const start1 = new Date(`1970-01-01T${slot1Start}:00`);
  const end1 = new Date(`1970-01-01T${slot1End}:00`);
  const start2 = new Date(`1970-01-01T${slot2Start}:00`);
  const end2 = new Date(`1970-01-01T${slot2End}:00`);

  return start1 < end2 && start2 < end1;
};

// Helper function to check if a booking is still active
const isBookingActive = (booking: Booking): boolean => {
  const now = new Date();
  const bookingDate = new Date(booking.date);
  const bookingEndTime = new Date(`${booking.date}T${booking.slot.endTime}:00`);
  
  // Booking is active if it's today and hasn't ended yet
  return bookingDate.toDateString() === now.toDateString() && bookingEndTime > now;
};

export const fetchBookings = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { date, location, auditorium } = req.query;

      let scanParams: any = {
        TableName: "bookings"
      };

      // Add filters if provided
      const filterExpressions: string[] = [];
      const expressionAttributeNames: any = {};
      const expressionAttributeValues: any = {};

      if (date) {
        filterExpressions.push("#date = :date");
        expressionAttributeNames["#date"] = "date";
        expressionAttributeValues[":date"] = date;
      }

      if (location) {
        filterExpressions.push("#location = :location");
        expressionAttributeNames["#location"] = "location";
        expressionAttributeValues[":location"] = location;
      }

      if (auditorium) {
        filterExpressions.push("auditorium = :auditorium");
        expressionAttributeValues[":auditorium"] = parseInt(auditorium as string);
      }

      if (filterExpressions.length > 0) {
        scanParams.FilterExpression = filterExpressions.join(" AND ");
        scanParams.ExpressionAttributeNames = expressionAttributeNames;
        scanParams.ExpressionAttributeValues = expressionAttributeValues;
      }

      const result = await dynamoDocClient.send(new ScanCommand(scanParams));
      const bookings = (result.Items || []) as Booking[];

      // Sort bookings by date and time
      const sortedBookings = bookings.sort((a, b) => {
        const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
        if (dateCompare !== 0) return dateCompare;
        
        return a.slot.startTime.localeCompare(b.slot.startTime);
      });

      res.status(StatusCodes.OK).json({
        message: "Bookings fetched successfully",
        data: sortedBookings,
        totalBookings: sortedBookings.length,
        filters: {
          date: date || null,
          location: location || null,
          auditorium: auditorium ? parseInt(auditorium as string) : null
        }
      });
    } catch (err) {
      console.error("Error fetching bookings:", err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch bookings" });
    }
  }
);

export const addBooking = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const {
        movieIds,
        userId,
        auditorium,
        date,
        noOfPersons,
        location,
        amountPaid,
        slot
      } = req.body;

      // Validate required fields
      if (!movieIds || !userId || !auditorium || !date || !noOfPersons || !location || !amountPaid || !slot) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: "All booking fields are required"
        });
      }

      // Validate slot format
      if (!slot.startTime || !slot.endTime) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: "Slot must have startTime and endTime"
        });
      }

      // Check for conflicting bookings
      const conflictCheckResult = await dynamoDocClient.send(
        new ScanCommand({
          TableName: "bookings",
          FilterExpression: "#date = :date AND #location = :location AND auditorium = :auditorium",
          ExpressionAttributeNames: {
            "#date": "date",
            "#location": "location"
          },
          ExpressionAttributeValues: {
            ":date": date,
            ":location": location,
            ":auditorium": auditorium
          }
        })
      );

      const existingBookings = (conflictCheckResult.Items || []) as Booking[];
      
      // Filter out expired bookings for conflict checking
      const activeBookings = existingBookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        const requestDate = new Date(date);
        
        // If it's a future date, all bookings are active
        if (requestDate > new Date()) {
          return true;
        }
        
        // If it's today, check if booking hasn't ended
        return isBookingActive(booking);
      });

      // Check for slot conflicts
      const hasConflict = activeBookings.some(booking => 
        doSlotsOverlap(
          slot.startTime,
          slot.endTime,
          booking.slot.startTime,
          booking.slot.endTime
        )
      );

      if (hasConflict) {
        return res.status(StatusCodes.CONFLICT).json({
          error: "This auditorium is already booked for the selected time slot",
          conflictingBookings: activeBookings.filter(booking => 
            doSlotsOverlap(
              slot.startTime,
              slot.endTime,
              booking.slot.startTime,
              booking.slot.endTime
            )
          )
        });
      }

      // Create new booking
      const newBooking: Booking = {
        _id: uuidv4(),
        transactionId: uuidv4(),
        movieIds: Array.isArray(movieIds) ? movieIds : [movieIds],
        userId,
        auditorium,
        date,
        noOfPersons,
        location,
        amountPaid,
        slot
      };

      // Save booking to database
      await dynamoDocClient.send(
        new PutCommand({
          TableName: "bookings",
          Item: newBooking
        })
      );

      res.status(StatusCodes.CREATED).json({
        message: "Booking created successfully",
        data: newBooking
      });
    } catch (err) {
      console.error("Error creating booking:", err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to create booking" });
    }
  }
);

