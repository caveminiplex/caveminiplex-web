import type { Movie } from "../../types/movie.type";
import { calculatePrice } from "../../util/time.util";
import popcornImg from "../../assets/images/popcorn.jpg";

const PriceSection = ({
  isMovieSlotSelected,
  totalTime,
  selectedMovies,
  setIsPaymentModalOpen,
  setIsAddOnModalOpen,
}: {
  isMovieSlotSelected: boolean;
  totalTime: string;
  selectedMovies: Movie[];
  setIsPaymentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddOnModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="w-full h-full flex flex-1 flex-col justify-between">
      <div className="flex-[0.7] w-full h-full">
        <div className=" w-full bg-gradient-to-r from-blue-100 from-[20%] to-transparent px-7 py-5 rounded-lg">
          <h2 className="text-2xl text-neutral-800 font-semibold">
            Total time: {totalTime}
          </h2>
        </div>

        <div className="mt-6 w-full">
          <div className="w-full border-b border-neutral-300 pb-2">
            <p className="font-medium">Summary</p>
          </div>

          <div className="w-full h-[300px] overflow-y-scroll custom-scrollbar-thin">
            <table className="w-full  mt-4 text-xs [&>*>tr>td]:text-[11px] [&>*>tr>td]:py-2">
              <thead>
                <tr className="font-medium border-b border-neutral-300 [&>th]:pb-1">
                  <th className="text-start">Movie</th>
                  <th className="text-center">Time</th>
                  <th className="text-center">Price/h</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>

              <tbody>
                {selectedMovies.map((movie) => (
                  <tr key={movie.id}>
                    <td>{movie.title}</td>
                    <td className="text-center">{movie.duration}</td>
                    <td className="text-center">₹ 350</td>
                    <td className="text-end">
                      ₹ {calculatePrice(movie.duration)}
                    </td>
                  </tr>
                ))}

                {selectedMovies.length != 0 && (
                  <tr className="border-t border-neutral-300 sticky bottom-0 bg-white">
                    <td className="font-semibold px-3">Total</td>
                    <td></td>
                    <td></td>
                    <td className="text-end">₹ {calculatePrice(totalTime)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex-[0.3] w-full h-full flex flex-col items-end border-t border-t-neutral-300">
        {/* Add on section */}
        <div className="flex flex-1 py-4 px-4 space-x-4">
          {/* The popcorn image */}
          <div className="flex-[0.4]">
            <img
              src={popcornImg}
              alt="Add on food item image"
              className="rounded-lg"
            />
          </div>

          <div className="flex-[0.6]">
            <h3 className="text-sm font-bold text-gray-800">
              Make Your Movie Night Tastier! 🍿
            </h3>
            <p className="mt-2 text-[10px] text-gray-600 max-w-md">
              Choose from popcorn, nachos, and drinks to complete your private
              cinema experience. Add them along with your ticket in just one
              click.
            </p>
            <button
              onClick={() => {
                setIsAddOnModalOpen(true);
              }}
              className="w-full mt-6 px-6 py-3 rounded-lg bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white font-semibold text-xs shadow hover:opacity-90 transition cursor-pointer"
            >
              Add Snacks to My Booking
            </button>
          </div>
        </div>

        <button
          className={`w-full py-3 text-center rounded-lg bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 cursor-pointer ${
            isMovieSlotSelected ? "brightness-100" : "brightness-50"
          }`}
          onClick={() => {
            if (isMovieSlotSelected) setIsPaymentModalOpen(true);
          }}
        >
          Pay Now ₹{calculatePrice(totalTime)}
        </button>
      </div>
    </div>
  );
};

export default PriceSection;
