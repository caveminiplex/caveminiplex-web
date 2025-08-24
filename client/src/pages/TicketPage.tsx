import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Booking } from "../types/booking.type";
import type { Movie } from "../types/movie.type";
import MovieCard from "../components/MovieCard";
import { toast } from "react-hot-toast";
import { downloadTicketAsImage } from "../util/ticket.util";

const TicketPage = () => {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const fetchBookingData = async () => {
      if (!id) return;

      try {
        setLoading(true);

        // Demo booking data
        const demoBooking: Booking = {
          _id: id || "demo-booking-123",
          transactionId:
            "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
          movieIds: ["8587", "209112"],
          userId: "user-123",
          auditorium: 3,
          date: "2025-08-25",
          noOfPersons: 2,
          location: "Sadar Bazar, Agra",
          amountPaid: 850,
          slot: {
            startTime: "10 AM",
            endTime: "12 PM",
          },
        };

        // Demo movies data
        const demoMovies: Movie[] = [
          {
            id: 8587,
            title: "The Lion King",
            duration: "1h 58m",
            poster_url:
              "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
            state: "NOW_SHOWING",
          },
          {
            id: 209112,
            title: "Barbie",
            duration: "1h 54m",
            poster_url:
              "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
            state: "NOW_SHOWING",
          },
        ];

        setBooking(demoBooking);
        setMovies(demoMovies);
        setUserName("John Doe");
        setUserEmail("john.doe@example.com");

        // Uncomment below to use real API calls
        /*
        const bookingData = await userApi.get(`/booking/${id}`);
        setBooking(bookingData.data.data);

        // Fetch movies data for each movieId
        const moviePromises = bookingData.data.data.movieIds.map(async (movieId: string) => {
          const response = await userApi.get(`/movie/${movieId}`);
          return response.data.data;
        });

        const moviesData = await Promise.all(moviePromises);
        setMovies(moviesData.flat());

        // Fetch user data - replace with actual user API call
        setUserName("John Doe");
        setUserEmail("john.doe@example.com");
        */
      } catch (error) {
        toast.error("Failed to load ticket details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [id]);

  const handleDownloadTicket = async () => {
    if (!booking || movies.length === 0) return;

    try {
      await downloadTicketAsImage(booking, movies, userName, userEmail);
      toast.success("Ticket downloaded successfully!");
    } catch (error) {
      console.error("Error downloading ticket:", error);
      toast.error("Failed to download ticket");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-xl text-neutral-600">
          Loading ticket details...
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Ticket not found</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 flex justify-between">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-600 mb-2">
            Your Ticket
          </h1>
          <p className="text-neutral-500 text-sm">
            Transaction ID: {booking.transactionId}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Movie Cards */}
            <div className="lg:w-1/2 p-8 bg-gradient-to-br from-fuchsia-50 to-blue-50">
              <h2 className="text-2xl font-bold text-neutral-800 mb-6">
                {movies.length > 1 ? "Movies" : "Movie"}
              </h2>
              <div className="flex flex-wrap gap-4">
                {movies.map((movie, index) => (
                  <div key={index} className="flex-shrink-0">
                    <MovieCard
                      movieInfo={movie}
                      width="180px"
                      height="260px"
                      titleSize="0.9rem"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Booking Details */}
            <div className="lg:w-1/2 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold text-neutral-800">
                    Booking Details
                  </h2>
                  <p className="text-sm text-neutral-500">
                    Booking ID: {booking._id}
                  </p>
                </div>

                <button
                  onClick={handleDownloadTicket}
                  className="w-fit px-6 py-2 text-sm rounded-lg text-white font-semibold bg-gradient-to-r from-fuchsia-500 to-blue-600 hover:from-fuchsia-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg cursor-pointer"
                >
                  Download Ticket
                </button>
              </div>

              <div className="space-y-6 overflow-y-scroll h-[400px] custom-scrollbar-thin">
                {/* Movie Names */}
                <div>
                  <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                    {movies.length > 1 ? "Movies" : "Movie"}
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {movies.map((movie, index) => (
                      <p
                        key={index}
                        className="text-lg text-neutral-800 font-medium"
                      >
                        {movie.title}
                        {index < movies.length - 1 ? ", " : ""}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Location & Auditorium */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                      Location
                    </h3>
                    <p className="text-lg text-neutral-800 font-medium">
                      {booking.location}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                      Auditorium
                    </h3>
                    <p className="text-lg text-neutral-800 font-medium">
                      Hall {booking.auditorium}
                    </p>
                  </div>
                </div>

                {/* Date & Time */}
                <div>
                  <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                    Date & Time
                  </h3>
                  <p className="text-lg text-neutral-800 font-medium">
                    {new Date(booking.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-lg text-neutral-600">
                    {booking.slot.startTime} - {booking.slot.endTime}
                  </p>
                </div>

                {/* Number of Persons */}
                <div>
                  <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                    Number of Persons
                  </h3>
                  <p className="text-lg text-neutral-800 font-medium">
                    {booking.noOfPersons}
                  </p>
                </div>

                {/* Amount Paid */}
                <div>
                  <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                    Amount Paid
                  </h3>
                  <p className="text-2xl text-green-600 font-bold">
                    ₹{booking.amountPaid}
                  </p>
                </div>

                {/* User Details */}
                <div>
                  <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                    Customer Details
                  </h3>
                  <p className="text-lg text-neutral-800 font-medium">
                    {userName}
                  </p>
                  <p className="text-neutral-600">{userEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
