import { useEffect, useState } from "react";
import {
  addTimes,
  DAYS,
  getUpcomingDays,
  MONTHS,
  timeObjToStr,
} from "../../../util/time.util";
import type {
  DateType,
  TimeType,
} from "../../../components/booking/PickingSection";
import Timebox from "../../../components/Timebox";
import type { AvailableSlotType } from "../../../types/booking.type";
import { formatDate } from "../../../util/date.util";
import { useLocation } from "../../../contexts/LocationContext";
import {
  isAudiAvailableFromTime,
  isTimeAvailable,
} from "../../../util/slot.util";
import toast from "react-hot-toast";
import adminApi from "../../../apis/adminApi";

export type SlotType = {
  date: DateType | null;
  audi: number | null;
  noOfPerons: number;
  startTime: TimeType | null;
  endTime: TimeType | null;
  own_duration: string | null;
};

const DURATIONS: string[] = [
  "1h",
  "1h 30m",
  "2h",
  "2h 30m",
  "3h",
  "3h 30m",
  "4h",
];

const SLOTS: TimeType[] = [
  {
    hour: 9,
    min: 0,
    type: "AM",
  },
  {
    hour: 10,
    min: 0,
    type: "AM",
  },
  {
    hour: 11,
    min: 0,
    type: "AM",
  },
  {
    hour: 12,
    min: 0,
    type: "PM",
  },
  {
    hour: 1,
    min: 0,
    type: "PM",
  },
  {
    hour: 2,
    min: 0,
    type: "PM",
  },
  {
    hour: 3,
    min: 0,
    type: "PM",
  },
  {
    hour: 4,
    min: 0,
    type: "PM",
  },
  {
    hour: 5,
    min: 0,
    type: "PM",
  },
  {
    hour: 6,
    min: 0,
    type: "PM",
  },
  {
    hour: 7,
    min: 0,
    type: "PM",
  },
];

const AddBookingModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedDate, setSelectedDate] = useState<DateType>({
    month: MONTHS[new Date().getMonth()],
    date: new Date().getDate(),
    day: DAYS[new Date().getDay()],
  });

  const { setSelectedLocation } = useLocation();

  const [selectedAudi, setSelectedAudi] = useState<{
    audiNo: number;
    location: string;
  } | null>(null);

  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);

  const [noOfPersons, setNoOfPerons] = useState<number>(2);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<TimeType>({
    hour: 9,
    min: 0,
    type: "AM",
  });

  const [availableSlots, setAvailableSlots] = useState<
    {
      location: string;
      auditoriums: AvailableSlotType[];
    }[]
  >([]);

  const fetchAvailableSlots = async () => {
    const formattedDate = formatDate(selectedDate);

    const res = await adminApi.get(
      `/slots?date=${formattedDate}&startTime=${timeObjToStr(startTime)}`
    );

    const data = res.data.data;

    setAvailableSlots(data.locations);
  };

  const handleBooking = async () => {
    if (!name || !phoneNumber) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);
    const res = await adminApi.post("/add/booking", {
      transactionId: "offline",
      movieIds: ["offline"],
      userId: "offline",
      auditorium: selectedAudi?.audiNo,
      date: selectedDate ? formatDate(selectedDate) : "",
      noOfPersons: noOfPersons,
      location: selectedAudi?.location,
      amountPaid: amount,
      slot: {
        startTime: timeObjToStr(startTime),
        endTime: timeObjToStr(addTimes(startTime, selectedDuration!)),
      },
    });

    if (res.status === 200 || res.status === 201) {
      toast.success("Booking successful");

      setIsOpen(false);
      setLoading(false);
    } else {
      toast.error("Booking failed. Please try again.");
      setLoading(false);
    }
  };

  const selectAudi = (audino: number, location: string) => {
    setSelectedLocation(location);

    if (selectedAudi?.audiNo != audino || selectedAudi?.location != location) {
      setSelectedAudi({
        audiNo: audino,
        location: location,
      });
    }
  };

  useEffect(() => {
    setSelectedAudi(null);
    setSelectedDuration(null);
    setNoOfPerons(2);
  }, [startTime]);

  useEffect(() => {
    fetchAvailableSlots();
  }, [selectedDate, startTime]);

  if (!isOpen) return null;

  return (
    <div
      className="absolute top-0 left-0 w-full h-screen z-50 flex items-center justify-center backdrop-brightness-75"
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div
        className="w-[70%] h-[80%] flex flex-col bg-white px-10 py-7 rounded-lg overflow-y-scroll custom-scrollbar-thin"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full h-full flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Book Ticket</h1>

            {/* <select
              name="locationFilter"
              className="px-2 text-neutral-600 cursor-pointer outline-none"
              onChange={(e) => setSelectedLocation(e.target.value)}
              value={selectedLocation}
            >
              <option value="Sadar Bazar, Agra">Sadar Bazar, Agra</option>
              <option value="Fatehbad Road, Agra">Fatehbad Road, Agra</option>
            </select> */}
          </div>

          <div className="w-full mt-10 flex flex-col space-y-4">
            {/* Dates */}
            <div className="overflow-x-scroll custom-scrollbar-thin pb-2">
              <div className="flex items-center space-x-4">
                {getUpcomingDays(20).map((upcoming, index) => (
                  <div
                    onClick={() => {
                      setSelectedDate(upcoming);
                    }}
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

            <div className="w-full flex flex-col flex-wrap items-center justify-center py-2 px-2 lg:px-5 space-y-3">
              <h3 className="text-sm lg:text-base font-bold">Choose a time</h3>

              <div className="overflow-x-scroll custom-scrollbar-thin pb-2 w-full">
                <div className="flex flex-wrap items-center justify-center space-x-3 lg:space-x-5">
                  {SLOTS.map((time, index) => (
                    <Timebox
                      key={index}
                      time={time}
                      setTime={setStartTime}
                      isSelected={
                        time.hour == startTime?.hour &&
                        time.type === startTime.type
                      }
                      isAvailable={isTimeAvailable(availableSlots, time)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center py-2 lg:py-4 px-2 lg:px-5 space-y-3">
              <h3 className="text-sm lg:text-base font-bold">
                Choose a duration
              </h3>

              <div className="flex items-center justify-center flex-wrap gap-3 lg:gap-7">
                {DURATIONS.map((duration, index) => (
                  <div
                    key={index}
                    className={`text-[8px] lg:text-[10px] px-3 py-2 rounded-sm  cursor-pointer transition-all hover:scale-105 ${
                      selectedDuration === duration
                        ? "bg-blue-600 text-white "
                        : "bg-fuchsia-100"
                    }`}
                    onClick={() => {
                      if (selectedDuration === duration)
                        setSelectedDuration(null);
                      else setSelectedDuration(duration);
                    }}
                  >
                    {duration}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center py-2 lg:py-4 px-2 lg:px-5 space-y-3 lg:space-y-5">
              <h3 className="text-sm lg:text-base font-bold">
                Choose an auditorium
              </h3>

              <div className="flex flex-col items-center justify-center space-y-3 lg:space-y-5">
                {availableSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center space-y-4"
                  >
                    <p className="text-sm text-gray-500">{slot.location}</p>

                    <div className="flex items-center justify-center space-x-3 flex-wrap">
                      {slot.auditoriums.map((audi) => (
                        <div
                          onClick={() => {
                            if (
                              !isAudiAvailableFromTime(
                                slot.auditoriums,
                                audi.auditorium,
                                startTime
                              )
                            ) {
                              toast.error(
                                `No Slots Available in Audi ${audi.auditorium}`
                              );
                              return;
                            }
                            selectAudi(audi.auditorium, slot.location);
                          }}
                          className={`px-4 lg:px-5 py-2 lg:py-2 text-[10px] lg:text-sm  ${
                            audi.auditorium == selectedAudi?.audiNo &&
                            slot.location == selectedAudi?.location
                              ? "bg-blue-600 text-white"
                              : isAudiAvailableFromTime(
                                  slot.auditoriums,
                                  audi.auditorium,
                                  startTime
                                )
                              ? "bg-green-300"
                              : "bg-red-400"
                          } rounded-sm lg:rounded-lg shadow-2xs transition-all hover:scale-105 cursor-pointer`}
                          key={audi.auditorium}
                        >
                          Audi {audi.auditorium}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full flex flex-1">
              {/* Left Section */}

              {/* Right Section */}
              <div className="w-full flex-1 px-10">
                <h2 className="text-lg text-neutral-600">User Details</h2>

                <div className="mt-4 space-y-6">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="w-full border border-neutral-400 outline-none rounded-lg py-1 px-3 placeholder:text-sm"
                    placeholder="Full Name"
                  />

                  <input
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                    className="w-full border border-neutral-400 outline-none rounded-lg py-1 px-3 placeholder:text-sm"
                    placeholder="Mobile No."
                  />

                  <input
                    type="number"
                    value={noOfPersons}
                    onChange={(e) => {
                      setNoOfPerons(parseInt(e.target.value));
                    }}
                    className="w-full border border-neutral-400 outline-none rounded-lg py-1 px-3 placeholder:text-sm"
                    placeholder="No. of persons"
                  />

                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      setAmount(Number(e.target.value));
                    }}
                    className="w-full border border-neutral-400 outline-none rounded-lg py-1 px-3 placeholder:text-sm"
                    placeholder="Amount paid"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full py-8 flex items-center justify-between">
            <div></div>
            <button
              onClick={() => {
                handleBooking();
              }}
              className="w-fit px-7 py-3 rounded-lg bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white cursor-pointer transition"
            >
              {loading ? "Booking..." : "Book Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookingModal;
