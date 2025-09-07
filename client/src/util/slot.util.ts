import type { AvailableSlotType } from "../types/booking.type";
import type { TimeType } from "../components/booking/PickingSection";

// Basic 12h -> 24h converter for strings like "HH:MM AM/PM"
const to24h = (t: string): string => {
  const s = t.trim();
  const m = s.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) throw new Error(`Invalid time: ${t}`);
  let h = parseInt(m[1], 10) % 12;
  const min = m[2];
  const ap = m[3].toUpperCase();
  if (ap === "PM") h += 12;
  return `${h.toString().padStart(2, "0")}:${min}`;
};

// // Convert HH:MM to minutes since midnight
// const toMinutes = (hhmm: string): number => {
//   const [h, m] = hhmm.split(":").map(Number);
//   return h * 60 + m;
// };

// Format TimeType to strict label like "HH:MM AM/PM" (e.g., 09:00 AM)
export const toLabel12h = (time: TimeType): string => {
  const hour12 = time.hour % 12 === 0 ? 12 : time.hour % 12;
  const hh = hour12.toString().padStart(2, "0");
  const mm = String(time.min ?? 0).padStart(2, "0");
  const ap = time.type.toUpperCase();
  return `${hh}:${mm} ${ap}`;
};




export const isTimeAvailable = (
  slots: {
    location: string;
    auditoriums: AvailableSlotType[];
  }[],
  time: TimeType
): boolean => {
  const selectedTimeInMinutes = timeToMinutes(toLabel12h(time));

  // Check if the selected time is available in ANY auditorium at ANY location.
  return slots.some((location) =>
    location.auditoriums.some((auditorium) =>
      auditorium.availableSlots.some((slot) => {
        const slotStartTimeInMinutes = timeToMinutes(slot.startTime);
        const slotEndTimeInMinutes = timeToMinutes(slot.endTime);
        return (
          selectedTimeInMinutes >= slotStartTimeInMinutes &&
          selectedTimeInMinutes < slotEndTimeInMinutes
        );
      })
    )
  );
};



// Helper to convert time string (e.g., "09:00 AM") to minutes from midnight
const timeToMinutes = (timeStr: string): number => {
  const date = new Date(`1970-01-01T${to24h(timeStr)}`);
  return date.getHours() * 60 + date.getMinutes();
};






/**
 * Checks if an auditorium has any availability at or after a given time.
 * @param slots - The list of available slots for the auditorium.
 * @param audiOneBased - The auditorium number (1-based).
 * @param time - The time from which to check for availability.
 * @returns `true` if there is an available slot, `false` otherwise.
 */
export const isAudiAvailableFromTime = (
  slots: AvailableSlotType[],
  audiOneBased: number,
  time: TimeType
): boolean => {
  // Find the specific auditorium from the list of all available slots.
  const auditorium = slots.find((s) => s.auditorium === audiOneBased);

  // If the auditorium isn't found or has no available slots, it's not available.
  if (!auditorium || !auditorium.availableSlots.length) {
    return false;
  }

  // Convert the selected time to minutes from midnight for easy comparison.
  const selectedTimeInMinutes = timeToMinutes(toLabel12h(time));

  // Check if the selected time falls within any of the available time ranges.
  return auditorium.availableSlots.some((slot) => {
    const slotStartTimeInMinutes = timeToMinutes(slot.startTime);
    const slotEndTimeInMinutes = timeToMinutes(slot.endTime);

    // The auditorium is available if the selected time is at or after the start
    // of an available slot and before the end of that same slot.
    return (
      selectedTimeInMinutes >= slotStartTimeInMinutes &&
      selectedTimeInMinutes < slotEndTimeInMinutes
    );
  });
};