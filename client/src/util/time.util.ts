export const getUpcoming10Days = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
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

  const today = new Date();
  const result = [];

  for (let i = 0; i < 10; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    result.push({
      date: date.getDate(),
      day: days[date.getDay()],
      month: months[date.getMonth()],
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



export const  calculatePrice = (totalTime:string) => {
  const hoursMatch = totalTime.match(/(\d+)h/);
  const minutesMatch = totalTime.match(/(\d+)m/);

  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

  // Convert everything to hours
  const totalHours = hours + minutes / 60;

  // Calculate price at ₹350 per hour
  const price = totalHours * 350;

  // Round to 2 decimals for cleaner output
  return Number(price.toFixed(2));
}
