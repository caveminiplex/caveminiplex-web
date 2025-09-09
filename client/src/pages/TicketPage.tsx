import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Booking } from "../types/booking.type";
import type { Movie } from "../types/movie.type";
import MovieCard from "../components/MovieCard";
import { toast } from "react-hot-toast";
import { downloadTicketAsImage } from "../util/ticket.util";
import userApi from "../apis/userApi";

const useCardDimensions = () => {
  const [dimensions, setDimensions] = useState(() => {
    if (typeof window === "undefined")
      return { width: "140px", height: "200px" };

    if (window.innerWidth >= 768) {
      return { width: "180px", height: "260px" };
    } else if (window.innerWidth >= 640) {
      return { width: "160px", height: "240px" };
    } else {
      return { width: "140px", height: "200px" };
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setDimensions({ width: "180px", height: "260px" });
      } else if (window.innerWidth >= 640) {
        setDimensions({ width: "160px", height: "240px" });
      } else {
        setDimensions({ width: "140px", height: "200px" });
      }
    };

    // Set initial dimensions
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return dimensions;
};

const TicketPage = () => {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const { width, height } = useCardDimensions();

  useEffect(() => {
    const fetchBookingData = async () => {
      if (!id) return;

      try {
        setLoading(true);

        const bookingData = await userApi.get(`/booking/${id}`);
        setBooking(bookingData.data.data);

        // Fetch movies data for each movieId
        const moviePromises = bookingData.data.data.movieIds.map(
          async (movieId: string) => {
            const response = await userApi.get(`/movie/${movieId}`);
            return response.data.data;
          }
        );

        const moviesData = await Promise.all(moviePromises);
        setMovies(moviesData.flat());

        setUserName("John Doe");
        setUserEmail("john.doe@example.com");
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
    <div className="w-full h-full overflow-y-scroll custom-scrollbar bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-600">
            Your Ticket
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 bg-white/50 px-3 py-1 rounded-full">
            Transaction ID: {booking.transactionId}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Movie Cards */}
            <div className="lg:w-1/2 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-fuchsia-50 to-blue-50">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-4 sm:mb-6">
                {movies.length > 1 ? "Movies" : "Movie"}
              </h2>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
                {movies.map((movie, index) => (
                  <div key={index} className="flex-shrink-0">
                    <MovieCard
                      movieInfo={movie}
                      width={width}
                      height={height}
                      titleSize="0.8rem"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Booking Details */}
            <div className="lg:w-1/2 p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-800 truncate">
                    Booking Details
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500 truncate">
                    ID: {booking._id}
                  </p>
                </div>

                <button
                  onClick={handleDownloadTicket}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm rounded-lg text-white font-semibold bg-gradient-to-r from-fuchsia-500 to-blue-600 hover:from-fuchsia-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg cursor-pointer"
                >
                  Download Ticket
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6 h-fit px-1 sm:px-2">
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
                {/* Note Section */}
                <div className="w-full rounded-lg border border-neutral-200 p-3 bg-neutral-50">
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    <span className="font-semibold text-neutral-700">
                      Note:
                    </span>{" "}
                    Please arrive 15 minutes before showtime. Latecomers may not
                    be admitted, and tickets are non-refundable for missed
                    screenings.
                  </p>
                </div>

                {/* Date & Time */}
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-1 sm:mb-2">
                    Date & Time
                  </h3>
                  <p className="text-base sm:text-lg text-neutral-800 font-medium">
                    {new Date(booking.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-base sm:text-lg text-neutral-600">
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
                  <h3 className="text-xs sm:text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-1 sm:mb-2">
                    Customer Details
                  </h3>
                  <p className="text-base sm:text-lg text-neutral-800 font-medium">
                    {userName}
                  </p>
                  <p className="text-sm sm:text-base text-neutral-600 break-all">
                    {userEmail}
                  </p>
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
