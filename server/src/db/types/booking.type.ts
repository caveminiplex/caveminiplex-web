export interface Booking {
  _id: string;
  transactionId: string;
  movieIds: string[];
  auditorium: number;
  date: string;
  slot: {
    startTime: string;
    endTime: string;
  };
}
