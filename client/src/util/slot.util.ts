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

// Convert HH:MM to minutes since midnight
const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

// Format TimeType to strict label like "HH:MM AM/PM" (e.g., 09:00 AM)
export const toLabel12h = (time: TimeType): string => {
  const hour12 = time.hour % 12 === 0 ? 12 : time.hour % 12;
  const hh = hour12.toString().padStart(2, "0");
  const mm = String(time.min ?? 0).padStart(2, "0");
  const ap = time.type.toUpperCase();
  return `${hh}:${mm} ${ap}`;
};

export const isAudiAvailable = (
  slot: AvailableSlotType[],
  audiOneBased: number
): boolean => {
  const auditorium = slot.find((s) => s.auditorium === audiOneBased);
  if (!auditorium) return false;
  return auditorium.availableSlots.length > 0;
};

// Check if a specific time is available for an auditorium, using backend ranges
export const isTimeAvailableForAudi = (
  slots: AvailableSlotType[],
  audiZeroBased: number,
  time: TimeType
): boolean => {
  const audi = slots.find((s) => s.auditorium === audiZeroBased + 1);
  if (!audi || !audi.availableSlots?.length) return false;

  const candidate12 = toLabel12h(time); // e.g., "09:00 AM"
  let cand24: string;
  try {
    cand24 = to24h(candidate12);
  } catch {
    return false;
  }
  const candMin = toMinutes(cand24);

  // Slot is available if it's within any available range [start, end)
  return audi.availableSlots.some((range) => {
    try {
      const startMin = toMinutes(to24h(range.startTime));
      const endMin = toMinutes(to24h(range.endTime));

      return candMin >= startMin && candMin < endMin;
    } catch {
      return false;
    }
  });
};
