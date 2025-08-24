export interface Booking {
  _id: string;
  transactionId: string;
  movieIds: string[];
  userId: string;
  auditorium: number;
  date: string;
  noOfPersons: number;
  location: string;
  amountPaid: number;
  slot: {
    startTime: string;
    endTime: string;
  };
}
