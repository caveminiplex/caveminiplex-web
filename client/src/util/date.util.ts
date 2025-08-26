import type { DateType } from "../components/booking/PickingSection";

const MONTHS: Record<string, string> = {
    Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
    Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

export const formatDate = (date: DateType) => {
  return `${new Date().getFullYear()}-${MONTHS[date.month]}-${date.date}`;
};