import { useState } from "react";
import { DAYS, getUpcomingDays, MONTHS } from "../../../util/time.util";
import type { DateType } from "../../../components/booking/PickingSection";
import { isAudiAvailable } from "../../../util/slot.util";
import toast from "react-hot-toast";
import type { AvailableSlotType } from "../../../types/booking.type";

const AddBookingModal = ({
  isOpen,
  setIsOpen,
  actionFunc,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  actionFunc: (movieId: string, state: string) => Promise<void>;
}) => {
  const [selectedDate, setSelectedDate] = useState<DateType>({
    month: MONTHS[new Date().getMonth()],
    date: new Date().getDate(),
    day: DAYS[new Date().getDay()],
  });

  const [selectedLocation, setSelectedLocation] =
    useState<string>("Sadar Bazar, Agra");

  const [availableSlots, setAvailableSlots] = useState<AvailableSlotType[]>([]);

  const [selectedAudi, setSelectedAudi] = useState<number>(0);

  if (!isOpen) return null;

  return (
    <div
      className="absolute top-0 left-0 w-full h-screen z-50 flex items-center justify-center backdrop-brightness-75"
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div
        className="w-[70%] h-[70%] flex flex-col bg-white px-10 py-14 rounded-lg"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full h-full flex-[0.9]">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Book Ticket</h1>

            <select
              name="locationFilter"
              className="px-2 text-neutral-600 cursor-pointer outline-none"
              onChange={(e) => setSelectedLocation(e.target.value)}
              value={selectedLocation}
            >
              <option value="Sadar Bazar, Agra">Sadar Bazar, Agra</option>
              <option value="Fatehbad Road, Agra">Fatehbad Road, Agra</option>
            </select>
          </div>

          <div className="w-full mt-10 flex flex-col space-y-8">
            {/* Dates */}
            <div className="overflow-x-scroll custom-scrollbar-thin pb-2">
              <div className="flex items-center space-x-4">
                {getUpcomingDays(20).map((upcoming, index) => (
                  <div
                    onClick={() => {}}
                    className={`flex flex-col items-center justify-center px-5 py-3 rounded-lg  ${
                      selectedDate?.date == upcoming.date
                        ? "bg-blue-600 text-white"
                        : "bg-fuchsia-100"
                    } transition-all hover:scale-105 cursor-pointer`}
                    key={index}
                  >
                    <p className="text-[10px]">{upcoming.month}</p>
                    <p className="font-semibold">{upcoming.date}</p>
                    <p className="text-[10px]">{upcoming.day}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full flex flex-1">
              {/* Left Section */}
              <div className="w-full flex-[0.5] border-r border-neutral-400">
                {/* Rooms */}
                <div className="flex items-center justify-center space-x-3 mt-2 flex-wrap">
                  {[0, 1, 2, 3].map((audino) => (
                    <div
                      onClick={() => {
                        if (!isAudiAvailable(availableSlots, audino + 1)) {
                          console.log("not available");
                          toast.error(
                            `No Slots Available in Audi ${audino + 1}`
                          );
                          return;
                        }
                        setSelectedAudi(audino);
                      }}
                      className={`px-6 py-3 text-xs  ${
                        audino == selectedAudi
                          ? "bg-blue-600 text-white"
                          : isAudiAvailable(availableSlots, audino + 1)
                          ? "bg-green-300"
                          : "bg-red-400"
                      } rounded-lg shadow-2xs transition-all hover:scale-105 cursor-pointer`}
                      key={audino}
                    >
                      Audi {audino + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Section */}
              <div className="w-full flex-[0.5] px-10">
                <h2 className="text-lg text-neutral-600">User Details</h2>

                <div className="mt-4 space-y-6">
                  <input
                    type="text"
                    className="w-full border border-neutral-400 outline-none rounded-lg py-1 px-3 placeholder:text-sm"
                    placeholder="Full Name"
                  />

                  <input
                    type="number"
                    className="w-full border border-neutral-400 outline-none rounded-lg py-1 px-3 placeholder:text-sm"
                    placeholder="Mobile No."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-full flex-[0.1] flex items-center justify-between">
          <div></div>
          <button className="w-fit px-7 py-3 rounded-lg bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white cursor-pointer transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBookingModal;
