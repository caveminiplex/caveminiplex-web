import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { StatusCodes } from "http-status-codes";
import { dynamoDocClient } from "../../db/db";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Booking } from "../../db/types/booking.type";

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

// Helper function to check if a specific time slot is available
const isTimeSlotAvailable = (
  startTime: string,
  endTime: string,
  activeBookings: Booking[]
): boolean => {
  return !activeBookings.some(booking => 
    doSlotsOverlap(
      startTime,
      endTime,
      booking.slot.startTime,
      booking.slot.endTime
    )
  );
};

// Helper function to generate available time slots for an auditorium
const getAvailableTimeSlots = (activeBookings: Booking[]): { startTime: string; endTime: string }[] => {
  // Define operating hours (9 AM to 11 PM)
  const operatingStart = "09:00";
  const operatingEnd = "23:00";
  
  // Sort bookings by start time
  const sortedBookings = activeBookings.sort((a, b) => 
    a.slot.startTime.localeCompare(b.slot.startTime)
  );
  
  const availableSlots: { startTime: string; endTime: string }[] = [];
  
  // Check if there's availability before the first booking
  if (sortedBookings.length === 0) {
    availableSlots.push({ startTime: operatingStart, endTime: operatingEnd });
    return availableSlots;
  }
  
  // Check gap before first booking
  if (sortedBookings[0].slot.startTime > operatingStart) {
    availableSlots.push({ 
      startTime: operatingStart, 
      endTime: sortedBookings[0].slot.startTime 
    });
  }
  
  // Check gaps between bookings
  for (let i = 0; i < sortedBookings.length - 1; i++) {
    const currentEnd = sortedBookings[i].slot.endTime;
    const nextStart = sortedBookings[i + 1].slot.startTime;
    
    if (currentEnd < nextStart) {
      availableSlots.push({ 
        startTime: currentEnd, 
        endTime: nextStart 
      });
    }
  }
  
  // Check gap after last booking
  const lastBookingEnd = sortedBookings[sortedBookings.length - 1].slot.endTime;
  if (lastBookingEnd < operatingEnd) {
    availableSlots.push({ 
      startTime: lastBookingEnd, 
      endTime: operatingEnd 
    });
  }
  
  return availableSlots;
};

export const fetchAvailableSlots = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { date, location, auditorium, startTime, endTime } = req.query;

      if (!date || !location) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: "Date and location are required"
        });
      }

      // Fetch all bookings for the specified date and location
      const result = await dynamoDocClient.send(
        new ScanCommand({
          TableName: "bookings",
          FilterExpression: "#date = :date AND #location = :location",
          ExpressionAttributeNames: {
            "#date": "date",
            "#location": "location"
          },
          ExpressionAttributeValues: {
            ":date": date,
            ":location": location
          }
        })
      );

      const existingBookings = (result.Items || []) as Booking[];
      
      // Filter out expired bookings
      const activeBookings = existingBookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        const requestDate = new Date(date as string);
        
        // If it's a future date, all bookings are active
        if (requestDate > new Date()) {
          return true;
        }
        
        // If it's today, check if booking hasn't ended
        return isBookingActive(booking);
      });

      // If checking specific time slot availability
      if (startTime && endTime && auditorium) {
        const auditoriumNum = parseInt(auditorium as string);
        const auditoriumBookings = activeBookings.filter(booking => booking.auditorium === auditoriumNum);
        
        const isAvailable = isTimeSlotAvailable(
          startTime as string,
          endTime as string,
          auditoriumBookings
        );

        return res.status(StatusCodes.OK).json({
          message: "Slot availability checked",
          data: {
            date,
            location,
            auditorium: auditoriumNum,
            requestedSlot: {
              startTime,
              endTime
            },
            isAvailable
          }
        });
      }

      // Return all auditoriums with their available time slots
      const auditoriums = [1, 2, 3, 4];
      const auditoriumAvailability = auditoriums.map(auditoriumNum => {
        const auditoriumBookings = activeBookings.filter(booking => booking.auditorium === auditoriumNum);
        const availableSlots = getAvailableTimeSlots(auditoriumBookings);
        
        return {
          auditorium: auditoriumNum,
          availableSlots,
          totalAvailableSlots: availableSlots.length,
          existingBookings: auditoriumBookings.map(booking => ({
            startTime: booking.slot.startTime,
            endTime: booking.slot.endTime
          }))
        };
      });

      res.status(StatusCodes.OK).json({
        message: "Available slots fetched successfully",
        data: {
          date,
          location,
          auditoriums: auditoriumAvailability,
          totalAuditoriums: auditoriums.length
        }
      });
    } catch (err) {
      console.error("Error fetching available slots:", err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch available slots" });
    }
  }
);
