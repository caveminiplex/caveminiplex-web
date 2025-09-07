import type { Movie } from "../../types/movie.type";
import {
  addTimes,
  calculatePrice,
  roundOffCost,
  timeObjToStr,
} from "../../util/time.util";
import { useLocation } from "../../contexts/LocationContext";
import toast from "react-hot-toast";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { useState } from "react";
import type { TimeType } from "./PickingSection";

export const OwnDurationPricing = {
  "1h": 500,
  "1h 30m": 600,
  "2h": 700,
  "2h 30m": 900,
  "3h": 1200,
  "3h 30m": 1300,
  "4h 30m": 1400,
};

const PriceSection = ({
  isMovieSlotSelected,
  totalTime,
  selectedMovies,
  setIsImportantNoteModalOpen,
  noOfPersons,
  ownDuration,
  startTime,
}: {
  isMovieSlotSelected: boolean;
  totalTime: string;
  selectedMovies: Movie[];
  setIsImportantNoteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noOfPersons: number;
  ownDuration: string | null;
  startTime: TimeType | null;
}) => {
  const { selectedLocation } = useLocation();

  return (
    <div className="w-full h-full flex flex-1 flex-col justify-between">
      <div className="flex-[0.95] w-full h-full">
        <div className="bg-gradient-to-r from-blue-100 from-[20%] to-transparent px-7 py-4 rounded-lg space-y-4">
          {startTime && innerWidth >= 1024 && (
            <div className=" w-full rounded-lg flex flex-1  items-center justify-evenly">
              <div className="flex-[0.2] flex flex-col items-start">
                <p className="text-sm text-neutral-800">Start Time</p>
                <p className="text-xs text-neutral-500">
                  {startTime ? timeObjToStr(startTime) : ""}
                </p>
              </div>

              <div className="flex-[0.6] w-full h-[1px] border border-neutral-500 border-dashed"></div>

              <div className="flex-[0.2] flex flex-col items-end">
                {totalTime !== "0h 0m" && (
                  <>
                    <p className="text-sm text-neutral-800">End Time</p>
                    <p className="text-xs text-neutral-500">
                      {startTime
                        ? timeObjToStr(addTimes(startTime, totalTime))
                        : ""}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <h2 className="text-xs text-neutral-800 font-semibold">
              Total time: {totalTime}
            </h2>

            <p className="text-xs text-neutral-600">
              Location: {selectedLocation}
            </p>
          </div>
        </div>

        <div className="mt-6 w-full">
          <div className="w-full border-b border-neutral-300 pb-2">
            <p className="font-medium">Summary</p>
          </div>

          <div className="w-full overflow-y-scroll custom-scrollbar-thin">
            <table className="w-full mt-4 text-xs [&>*>tr>td]:text-[11px] [&>*>tr>td]:py-2">
              <thead>
                <tr className="font-medium border-b border-neutral-300 [&>th]:pb-1">
                  <th className="text-start">Movie</th>
                  <th className="text-center">Time</th>
                  <th className="text-center">Price</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>

              <tbody>
                {!ownDuration &&
                  selectedMovies.map((movie) => (
                    <tr key={movie.id}>
                      <td>{movie.title}</td>
                      <td className="text-center">{movie.duration}</td>
                      <td className="text-center">₹ 350</td>
                      <td className="text-end">
                        ₹ {calculatePrice(movie.duration, 0)}
                      </td>
                    </tr>
                  ))}

                {ownDuration &&
                  selectedMovies.map((movie) => (
                    <tr key={movie.id}>
                      <td>(CT) {movie.title}</td>
                      <td className="text-center">{movie.duration}</td>
                      <td className="text-center"></td>
                      <td className="text-end">
                        ₹{" "}
                        {
                          OwnDurationPricing[
                            ownDuration as keyof typeof OwnDurationPricing
                          ]
                        }
                      </td>
                    </tr>
                  ))}

                {noOfPersons > 2 && (
                  <tr key={"per-person-cost"}>
                    <td>Additional Person Charge</td>
                    <td className="text-center"></td>
                    <td className="text-center">₹ 100</td>
                    <td className="text-end">₹ {(noOfPersons - 2) * 100}</td>
                  </tr>
                )}

                {selectedMovies.length != 0 && (
                  <tr className="border-t border-neutral-300 bg-white">
                    <td className="font-semibold px-3">Total</td>
                    <td></td>
                    <td></td>
                    <td className="text-end">
                      ₹ {roundOffCost(calculatePrice(totalTime, noOfPersons))}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex-[0.05] w-full h-full flex flex-col items-end border-t border-t-neutral-300">
        {/* Add on section */}
        {/* <div className="flex flex-1 py-4 px-4 space-x-4">
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
        </div> */}

        <button
          className={`w-full py-3 text-center rounded-lg bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 cursor-pointer ${
            isMovieSlotSelected ? "brightness-100" : "brightness-50"
          }`}
          onClick={() => {
            if (isMovieSlotSelected) setIsImportantNoteModalOpen(true);
            else
              toast("Please select a movie slot", {
                icon: "🎟️",
              });
          }}
        >
          Pay Now ₹{roundOffCost(calculatePrice(totalTime, noOfPersons))}
        </button>
      </div>
    </div>
  );
};

export const PriceSectionMobile = ({
  isMovieSlotSelected,
  totalTime,
  selectedMovies,
  setIsImportantNoteModalOpen,
  noOfPersons,
  ownDuration,
}: {
  isMovieSlotSelected: boolean;
  totalTime: string;
  selectedMovies: Movie[];
  setIsImportantNoteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noOfPersons: number;
  ownDuration: string | null;
}) => {
  const [isSummaryPanelOpen, setIsSummaryPanelOpen] = useState<boolean>(false);

  return (
    <>
      {/* Summary Panel */}
      <div
        className={`absolute top-0 left-0 translate-y-[-0%] w-full h-[300px] bg-white px-4 py-4 z-0 transition-all ${
          isSummaryPanelOpen ? "translate-y-[-100%]" : "translate-y-[0%]"
        }`}
      >
        <div className="w-full border-b border-neutral-300 pb-2">
          <p className="text-sm font-medium">Summary</p>
        </div>

        <div className="w-full overflow-y-scroll custom-scrollbar-thin">
          <table className="w-full mt-4 text-xs [&>*>tr>td]:text-[7px] [&>*>tr>td]:py-2">
            <thead>
              <tr className="font-medium border-b border-neutral-300 [&>th]:pb-1 [&>th]:text-[10px]">
                <th className="text-start">Movie</th>
                <th className="text-center">Time</th>
                <th className="text-center">Price</th>
                <th className="text-end">Total</th>
              </tr>
            </thead>

            <tbody>
              {!ownDuration &&
                selectedMovies.map((movie) => (
                  <tr key={movie.id}>
                    <td>{movie.title}</td>
                    <td className="text-center">{movie.duration}</td>
                    <td className="text-center">₹ 350</td>
                    <td className="text-end">
                      ₹ {calculatePrice(movie.duration, 0)}
                    </td>
                  </tr>
                ))}

              {ownDuration &&
                selectedMovies.map((movie) => (
                  <tr key={movie.id}>
                    <td>(CT) {movie.title}</td>
                    <td className="text-center">{movie.duration}</td>
                    <td className="text-center"></td>
                    <td className="text-end">
                      ₹{" "}
                      {
                        OwnDurationPricing[
                          ownDuration as keyof typeof OwnDurationPricing
                        ]
                      }
                    </td>
                  </tr>
                ))}

              {noOfPersons > 2 && (
                <tr key={"per-person-cost"}>
                  <td>Additional Person Charge</td>
                  <td className="text-center"></td>
                  <td className="text-center">₹ 100</td>
                  <td className="text-end">₹ {(noOfPersons - 2) * 100}</td>
                </tr>
              )}

              {selectedMovies.length != 0 && (
                <tr className="border-t border-neutral-300 bg-white">
                  <td className="font-semibold px-3">Total</td>
                  <td></td>
                  <td></td>
                  <td className="text-end">
                    ₹ {roundOffCost(calculatePrice(totalTime, noOfPersons))}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full h-full flex flex-1 flex-col ">
        <div className="flex items-center justify-between py-3 px-4 z-10 bg-white">
          <h2 className="text-sm text-neutral-800 font-semibold shadow-2xl">
            Total time: {totalTime}
          </h2>

          {isSummaryPanelOpen ? (
            <IoIosArrowDropup
              className="text-lg"
              onClick={() => setIsSummaryPanelOpen(!isSummaryPanelOpen)}
            />
          ) : (
            <IoIosArrowDropdown
              className="text-lg"
              onClick={() => setIsSummaryPanelOpen(!isSummaryPanelOpen)}
            />
          )}
        </div>

        <div className="w-full h-fit flex items-center justify-between border-t border-t-neutral-300 px-4 py-3 z-10 bg-white">
          <p className="text-[10px] font-medium">Start: 9 AM - End: 12 PM</p>
          <button
            className={`w-fit h-fit py-2 px-5 text-xs text-center rounded-lg bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 cursor-pointer ${
              isMovieSlotSelected ? "brightness-100" : "brightness-50"
            }`}
            onClick={() => {
              if (isMovieSlotSelected) setIsImportantNoteModalOpen(true);
              else
                toast("Please select a movie slot", {
                  icon: "🎟️",
                });
            }}
          >
            Pay Now ₹{roundOffCost(calculatePrice(totalTime, noOfPersons))}
          </button>
        </div>
      </div>
    </>
  );
};

export default PriceSection;
