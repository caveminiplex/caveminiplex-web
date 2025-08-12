import MovieCard from "../components/MovieCard";
import { getUpcoming10Days } from "../util/time.util";
import qrCode from "../assets/images/qr.png";

const MoviesListing = () => {
  return (
    <div className="overflow-y-scroll h-full custom-scrollbar-thin">
      <div className="grid grid-cols-2 gap-5">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((value) => (
          <MovieCard
            width="150px"
            height="200px"
            key={value}
            titleSize="0.7rem"
          />
        ))}
      </div>
    </div>
  );
};

const PickingSection = () => {
  return (
    <div className="w-full h-full pr-4 border-r border-neutral-300">
      {/* Dates */}
      <div className="overflow-x-scroll pb-2 custom-scrollbar-thin">
        <div className="flex items-center space-x-4">
          {getUpcoming10Days().map((upcoming, index) => (
            <div
              className="flex flex-col items-center justify-center px-5 py-3 rounded-lg bg-fuchsia-100"
              key={index}
            >
              <p className="text-[10px]">{upcoming.month}</p>
              <p className="font-semibold">{upcoming.date}</p>
              <p className="text-[10px]">{upcoming.day}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rooms */}
      <div className="flex items-center justify-center space-x-3 space-y-3 mt-7 flex-wrap">
        <div className="px-8 py-3 bg-fuchsia-100 rounded-lg shadow-2xs">
          Audi 1
        </div>
        <div className="px-8 py-3 bg-fuchsia-100 rounded-lg shadow-2xs">
          Audi 2
        </div>
        <div className="px-8 py-3 bg-fuchsia-100 rounded-lg shadow-2xs">
          Audi 3
        </div>
        <div className="px-8 py-3 bg-fuchsia-100 rounded-lg shadow-2xs">
          Audi 4
        </div>
        <div className="px-8 py-3 bg-fuchsia-100 rounded-lg shadow-2xs">
          Audi 5
        </div>
      </div>

      <div></div>
    </div>
  );
};

const PriceSection = () => {
  return (
    <div className="w-full h-full flex flex-1 flex-col justify-between">
      <div className="flex-[0.9] w-full h-full">
        <div className=" w-full bg-gradient-to-r from-blue-100 from-[20%] to-transparent px-7 py-5 rounded-lg">
          <h2 className="text-2xl text-neutral-800 font-semibold">
            Total time: 2h 3min
          </h2>
        </div>

        <div className="mt-6 w-full">
          <div className="w-full border-b border-neutral-300 pb-2">
            <p className="font-medium">Summary</p>
          </div>

          <table className="w-full mt-4 text-xs [&>tr>td]:text-[11px] [&>tr>td]:py-2">
            <tr className="font-medium border-b border-neutral-300 [&>th]:pb-1 [&>th]:text-start">
              <th>Movie</th>
              <th>Time</th>
              <th>Price/h</th>
              <th>Total</th>
            </tr>
            <tr>
              <td>Avengers: Infinity War</td>
              <td>1h 30min</td>
              <td>₹ 100</td>
              <td>₹ 150</td>
            </tr>
            <tr>
              <td>Harry Potter: The prisoner of azkaban</td>
              <td>2h 30min</td>
              <td>₹ 100</td>
              <td>₹ 150</td>
            </tr>

            <tr>
              <td>Game of thrones</td>
              <td>1h</td>
              <td>₹ 100</td>
              <td>₹ 150</td>
            </tr>

            <tr className="border-t border-neutral-300">
              <td className="font-semibold">Total</td>
              <td></td>
              <td></td>
              <td>₹ 2000</td>
            </tr>
          </table>
        </div>
        <div className="flex flex-col items-center justify-center space-y-3 mt-4">
                <h1 className="font-bold">Pay ₹2000</h1>
                <img src={qrCode} width={150} className="object-contain"/>

                <p className="text-xs text-neutral-400">* After paying the amount, click on the Book Now button to book the show*</p>
        </div>
      </div>

        

      <div className="flex-[0.1] w-full h-full flex items-end">
        <button className="w-full py-3 text-center rounded-lg bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
          Book Now
        </button>
      </div>
    </div>
  );
};

const BookingPage = () => {
  return (
    <div className="w-full h-full flex flex-1">
      {/* MoviesListing */}
      <section className="flex-[0.25] h-full px-3 py-5 relative">
        <div className="absolute top-0 left-0 z-10  w-full flex justify-center">
          <div className=" w-[95%] h-[50px] blur-md   bg-gradient-to-b from-[#d5c3e7ee] from-30% to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 z-10  w-full flex justify-center">
          <div className=" w-[95%] h-[50px] blur-md   bg-gradient-to-b from-[#d5c3e7ee] from-30% to-transparent"></div>
        </div>

        <MoviesListing />
      </section>

      {/* date and time selectors */}
      <section className="flex-[0.4] h-full py-5 overflow-hidden ">
        <PickingSection />
      </section>

      {/* Price calculation */}
      <section className="flex-[0.35] h-full py-5 px-5">
        <PriceSection />
      </section>
    </div>
  );
};

export default BookingPage;
