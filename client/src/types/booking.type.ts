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

export interface BookingWithMovies extends Booking {
  userName?: string;
  userEmail?: string;
}


export interface AvailableSlotType {
    auditorium: number;
    availableSlots: {
        startTime: string;
        endTime: string;
    }[];
    totalAvailableSlots: number;
    existingBookings: string[];
}

