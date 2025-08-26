import type { TimeType } from "../components/booking/PickingSection";


export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


export const getUpcomingDays = (count:number) => {  

  const today = new Date();
  const result = [];

  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    result.push({
      date: date.getDate(),
      day: DAYS[date.getDay()],
      month: MONTHS[date.getMonth()],
    });
  }

  return result;
};

export const calculateTotalTime = (times: string[]): string => {
  let totalMinutes = 0;

  for (const time of times) {
    const hourMatch = time.match(/(\d+)h/);
    const minuteMatch = time.match(/(\d+)m/);

    const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
    const minutes = minuteMatch ? parseInt(minuteMatch[1], 10) : 0;

    totalMinutes += hours * 60 + minutes;
  }

  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  return `${totalHours}h ${remainingMinutes}m`;
};

// E.g. Addition of 9:00 AM and 2h 3m => 11:03 AM
export const addTimes = (startTime: TimeType, duration: string): TimeType => {
  // Parse duration (e.g. "2h 3m")
  const hourMatch = duration.match(/(\d+)h/);
  const minMatch = duration.match(/(\d+)m/);

  const addHours = hourMatch ? parseInt(hourMatch[1]) : 0;
  const addMinutes = minMatch ? parseInt(minMatch[1]) : 0;

  // Convert startTime to 24-hour minutes
  let hours24 = startTime.hour % 12;
  if (startTime.type === "PM") hours24 += 12;

  let totalMinutes = hours24 * 60 + startTime.min;
  totalMinutes += addHours * 60 + addMinutes;

  // Normalize back to 12-hour format
  totalMinutes = totalMinutes % (24 * 60);
  let newHours24 = Math.floor(totalMinutes / 60);
  let newMinutes = totalMinutes % 60;

  let newType: "AM" | "PM" = newHours24 >= 12 ? "PM" : "AM";
  let newHour = newHours24 % 12;
  if (newHour === 0) newHour = 12;

  return {
    hour: newHour,
    min: newMinutes,
    type: newType,
  };
};

export const calculatePrice = (totalTime: string, noOfPersons: number) => {
  const hoursMatch = totalTime.match(/(\d+)h/);
  const minutesMatch = totalTime.match(/(\d+)m/);

  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

  // Convert everything to hours
  const totalHours = hours + minutes / 60;

  // Calculate price at ₹350 per hour
  const price = totalHours * 350;

  const returnValue: number =
    noOfPersons <= 2
      ? Number(price.toFixed(2))
      : Number(price.toFixed(2)) + (noOfPersons - 2) * 100;


  return returnValue;
};

export const timeObjToStr = (time: TimeType): string => {
  return `${time.hour}:${time.min < 10 ? `0${time.min}` : time.min} ${
    time.type
  }`;
};

export const roundOffCost = (cost: number): number => {
  return Math.floor(cost / 100) * 100;
};
