import type { Movie } from "../../types/movie.type";
import { calculatePrice } from "../../util/time.util";

const PriceSection = ({
  isMovieSlotSelected,
  totalTime,
  selectedMovies,
  setIsPaymentModalOpen,
}: {
  isMovieSlotSelected: boolean;
  totalTime: string;
  selectedMovies: Movie[];
  setIsPaymentModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <div className="w-full h-full flex flex-1 flex-col justify-between">
      <div className="flex-[0.9] w-full h-full">
        <div className=" w-full bg-gradient-to-r from-blue-100 from-[20%] to-transparent px-7 py-5 rounded-lg">
          <h2 className="text-2xl text-neutral-800 font-semibold">
            Total time: {totalTime}
          </h2>
        </div>

        <div className="mt-6 w-full">
          <div className="w-full border-b border-neutral-300 pb-2">
            <p className="font-medium">Summary</p>
          </div>

          <table className="w-full mt-4 text-xs [&>tr>td]:text-[11px] [&>tr>td]:py-2">
            <tr className="font-medium border-b border-neutral-300 [&>th]:pb-1">
              <th className="text-start">Movie</th>
              <th className="text-center">Time</th>
              <th className="text-center">Price/h</th>
              <th className="text-end">Total</th>
            </tr>

            {selectedMovies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td className="text-center">{movie.duration}</td>
                <td className="text-center">₹ 350</td>
                <td className="text-end">₹ {calculatePrice(movie.duration)}</td>
              </tr>
            ))}

            {selectedMovies.length != 0 && (
              <tr className="border-t border-neutral-300">
                <td className="font-semibold">Total</td>
                <td></td>
                <td></td>
                <td className="text-end">₹ {calculatePrice(totalTime)}</td>
              </tr>
            )}
          </table>
        </div>
      </div>

      <div className="flex-[0.1] w-full h-full flex items-end">
        <button
          className={`w-full py-3 text-center rounded-lg bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 cursor-pointer ${
            isMovieSlotSelected ? "brightness-100" : "brightness-50"
          }`}

          onClick={() => {
            if(isMovieSlotSelected)
                setIsPaymentModalOpen(true)
          }}
        >
          Pay Now ₹{calculatePrice(totalTime)}
        </button>
      </div>
    </div>
  );
};

export default PriceSection;
