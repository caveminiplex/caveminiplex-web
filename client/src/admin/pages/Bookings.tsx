import { useEffect, useState } from "react";
import type { Booking } from "../../types/booking.type";
import adminApi from "../../apis/adminApi";
import toast from "react-hot-toast";
import AddBookingModal from "../components/Modals/AddBookingModal";

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filterLocation, setFilterLocation] = useState<string>(
    "Sadar Bazar, Agra"
  );

  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false)

  const fetchBookings = async () => {
    const res = await adminApi.get("/bookings");

    if (res.status === 200) {
      setBookings(res.data.data);
    } else {
      toast.error("Couldn't fetch booking information");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (

    <>
    <AddBookingModal isOpen={isBookingModalOpen} setIsOpen={setIsBookingModalOpen}/>

    <div className="w-full h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">All Bookings</h1>

        <div className="flex items-center space-x-6">
          <select
            name="locationFilter"
            className="px-2 text-neutral-600 cursor-pointer outline-none"
            onChange={(e) => setFilterLocation(e.target.value)}
            value={filterLocation}
          >
            <option value="Sadar Bazar, Agra">Sadar Bazar, Agra</option>
            <option value="Fatehbad Road, Agra">Fatehbad Road, Agra</option>
          </select>

          <button onClick={() => {setIsBookingModalOpen(true)}}  className="w-fit px-4 py-2 rounded-lg text-xs bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white cursor-pointer transition">
            New Booking
          </button>
        </div>
      </div>

      <div className="mt-10 w-full">
        <table className="w-full [&>*>tr>td]:text-xs [&>*>tr>th]:text-sm">
          <thead>
            <tr className="[&>th]:border [&>th]:border-neutral-400 [&>th]:py-3">
              <th>Id</th>
              <th>Name</th>
              <th>Movies</th>
              <th>Booking Info</th>
              <th>Payment</th>
              <th>Transaction ID</th>
            </tr>
          </thead>

          <tbody>
            {bookings.filter(booking => booking.location === filterLocation).reverse().map((booking) => (
              <tr className="[&>td]:border [&>td]:border-neutral-400 [&>td]:py-5 [&>td]:text-center">
                <td>{booking._id}</td>
                <td>Ronak</td>
                <td>{booking.movieIds.join(", ")}</td>
                <td>
                  Audi {booking.auditorium},{booking.date},{" "}
                  {booking.slot.startTime} to {booking.slot.endTime}
                </td>
                <td>{booking.amountPaid}</td>
                <td>{booking.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Bookings;
