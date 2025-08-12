export interface Booking {
  _id: string;
  transactionId: string;
  movieIds: string[];
  date: string;
  slot: {
    startTime: string;
    endTime: string;
  };
}
