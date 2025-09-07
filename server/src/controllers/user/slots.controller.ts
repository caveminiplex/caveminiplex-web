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

// Helper function to check if a booking is still active (for today's date)
const isBookingActive = (booking: Booking): boolean => {
  const now = new Date();
  const bookingDate = new Date(booking.date);
  // Normalize end time to 24h then compare
  const end24 = to24h(booking.slot.endTime);
  const bookingEndTime = new Date(`${booking.date}T${end24}:00`);

  return (
    bookingDate.toDateString() === now.toDateString() && bookingEndTime > now
  );
};

// Normalize time strings to 24-hour HH:mm. Accepts "9:00 AM" or "09:00".
const to24h = (timeStr: string): string => {
  const s = timeStr.trim();
  // If already HH:mm (24h), return as-is
  if (/^\d{2}:\d{2}$/.test(s)) return s;

  const m = s.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) {
    throw new Error(
      `Invalid time format: '${timeStr}'. Expected 'HH:mm' or 'h:mm AM/PM'`
    );
  }
  let hour = parseInt(m[1], 10) % 12;
  const minutes = m[2];
  const ampm = m[3].toUpperCase();
  if (ampm === "PM") hour += 12;
  return `${hour.toString().padStart(2, "0")}:${minutes}`;
};

// Convert 24h HH:mm to 12h "HH:MM AM/PM"
const to12h = (time24: string): string => {
  const m = time24.match(/^(\d{2}):(\d{2})$/);
  if (!m) {
    // If not 24h, try normalize first
    const normalized = to24h(time24);
    return to12h(normalized);
  }
  let hour = parseInt(m[1], 10);
  const minutes = m[2];
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour.toString().padStart(2, "0")}:${minutes} ${ampm}`;
};

// Helper function to check if a specific time slot is available
const isTimeSlotAvailable = (
  startTime: string,
  endTime: string,
  activeBookings: Booking[]
): boolean => {
  return !activeBookings.some((booking) =>
    doSlotsOverlap(
      startTime,
      endTime,
      booking.slot.startTime,
      booking.slot.endTime
    )
  );
};

// Helper function to generate available time slots for an auditorium
const getAvailableTimeSlots = (
  activeBookings: Booking[]
): { startTime: string; endTime: string }[] => {
  // Define operating hours (9 AM to 7 PM)
  const operatingStart = "09:00";
  const operatingEnd = "19:00";

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
      endTime: sortedBookings[0].slot.startTime,
    });
  }

  // Check gaps between bookings
  for (let i = 0; i < sortedBookings.length - 1; i++) {
    const currentEnd = sortedBookings[i].slot.endTime;
    const nextStart = sortedBookings[i + 1].slot.startTime;

    if (currentEnd < nextStart) {
      availableSlots.push({
        startTime: currentEnd,
        endTime: nextStart,
      });
    }
  }

  // Check gap after last booking
  const lastBookingEnd = sortedBookings[sortedBookings.length - 1].slot.endTime;
  if (lastBookingEnd < operatingEnd) {
    availableSlots.push({
      startTime: lastBookingEnd,
      endTime: operatingEnd,
    });
  }

  return availableSlots;
};

export const fetchAvailableSlots = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { date: rawDate, location, auditorium, startTime, endTime } = req.query;

      if (!rawDate) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: "Date is required",
        });
      }

      // Normalize date to YYYY-MM-DD format
      const dateObj = new Date(rawDate as string);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const date = `${year}-${month}-${day}`;

      // Define all possible locations
      const ALL_LOCATIONS = ["Sadar Bazar, Agra", "Fatehbad Road, Agra"];

      // Normalize optional start/end times if provided (support 'h:mm AM/PM')
      let normStartTime: string | undefined;
      let normEndTime: string | undefined;
      try {
        normStartTime =
          typeof startTime === "string" && startTime
            ? to24h(startTime)
            : undefined;
        normEndTime =
          typeof endTime === "string" && endTime ? to24h(endTime) : undefined;
      } catch (e: any) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: e.message || "Invalid time format" });
      }

      // Base scan parameters
      const scanParams: any = {
        TableName: "bookings",
        FilterExpression: "#date = :date",
        ExpressionAttributeNames: { "#date": "date" },
        ExpressionAttributeValues: { ":date": date },
      };

      // If a specific location is provided, add it to the filter
      if (location) {
        scanParams.FilterExpression += " AND #location = :location";
        scanParams.ExpressionAttributeNames["#location"] = "location";
        scanParams.ExpressionAttributeValues[":location"] = location;
      }

      const result = await dynamoDocClient.send(new ScanCommand(scanParams));
      const existingBookings = (result.Items || []) as Booking[];

      // Normalize booking slot times to 24h for all calculations
      const normalizedBookings: Booking[] = existingBookings.map((b) => ({
        ...b,
        slot: {
          startTime: to24h(b.slot.startTime as any),
          endTime: to24h(b.slot.endTime as any),
        },
      }));

      // Filter out expired bookings
      const today = new Date();
      const requestDate = new Date(String(date));
      const isFutureDate =
        requestDate.toDateString() !== today.toDateString() &&
        requestDate > today;
      const activeBookings = isFutureDate
        ? normalizedBookings
        : normalizedBookings.filter((booking) => isBookingActive(booking));

      // Helper function to get availability for a set of bookings
      const getAuditoriumAvailability = (bookings: Booking[]) => {
        const auditoriums = [1, 2, 3, 4];
        return auditoriums.map((auditoriumNum) => {
          const auditoriumBookings = bookings.filter(
            (b) => b.auditorium === auditoriumNum
          );
          const availableSlots24 = getAvailableTimeSlots(auditoriumBookings);
          return {
            auditorium: auditoriumNum,
            availableSlots: availableSlots24.map((s) => ({
              startTime: to12h(s.startTime),
              endTime: to12h(s.endTime),
            })),
            totalAvailableSlots: availableSlots24.length,
            existingBookings: auditoriumBookings.map((b) => ({
              startTime: to12h(b.slot.startTime),
              endTime: to12h(b.slot.endTime),
            })),
          };
        });
      };

      // Case 1: Specific slot check (requires location)
      if (normStartTime && normEndTime && auditorium && location) {
        const auditoriumNum = parseInt(auditorium as string);
        const auditoriumBookings = activeBookings.filter(
          (b) => b.auditorium === auditoriumNum
        );
        const isAvailable = isTimeSlotAvailable(
          normStartTime,
          normEndTime,
          auditoriumBookings
        );
        return res.status(StatusCodes.OK).json({
          message: "Slot availability checked",
          data: {
            date,
            location,
            auditorium: auditoriumNum,
            requestedSlot: {
              startTime: to12h(normStartTime),
              endTime: to12h(normEndTime),
            },
            isAvailable,
          },
        });
      }

      // Case 2: All slots for a specific location
      if (location) {
        const auditoriumAvailability = getAuditoriumAvailability(activeBookings);
        return res.status(StatusCodes.OK).json({
          message: "Available slots fetched successfully",
          data: {
            date,
            location,
            auditoriums: auditoriumAvailability,
            totalAuditoriums: 4,
          },
        });
      }

      // Case 3: All slots for all locations
      const availabilityByLocation = ALL_LOCATIONS.map((loc) => {
        const locationBookings = activeBookings.filter((b) => b.location === loc);
        const auditoriumAvailability = getAuditoriumAvailability(locationBookings);
        return {
          location: loc,
          auditoriums: auditoriumAvailability,
          totalAuditoriums: 4,
        };
      });

      res.status(StatusCodes.OK).json({
        message: "Available slots for all locations fetched successfully",
        data: {
          date,
          locations: availabilityByLocation,
        },
      });
    } catch (err) {
      console.error("Error fetching available slots:", err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch available slots" });
    }
  }
);
