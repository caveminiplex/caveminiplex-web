import { useEffect, useState } from "react";
import {
  addTimes,
  DAYS,
  getUpcomingDays,
  MONTHS,
} from "../../util/time.util";
import Timebox from "../Timebox";
import { useLocation } from "../../contexts/LocationContext";
import userApi from "../../apis/userApi";
import { formatDate } from "../../util/date.util";
import type { AvailableSlotType } from "../../types/booking.type";
import { isAudiAvailable, isTimeAvailableForAudi } from "../../util/slot.util";
import { toast } from "react-hot-toast";

export type DateType = {
  month: string;
  date: number;
  day: string;
};

export type TimeType = {
  hour: number;
  min: number;
  type: "AM" | "PM";
};

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

const PickingSection = ({
  setSlotInfo,
  totalTime,
}: {
  totalTime: string;
  setSlotInfo: React.Dispatch<React.SetStateAction<SlotType | null>>;
}) => {
  const [selectedDate, setSelectedDate] = useState<DateType>({
    month: MONTHS[new Date().getMonth()],
    date: new Date().getDate(),
    day: DAYS[new Date().getDay()],
  });

  const [selectedAudi, setSelectedAudi] = useState<number>(0);

  const [noOfPersons, setNoOfPerons] = useState<number>(2);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<TimeType | null>(null);
  const { selectedLocation, setSelectedLocation } = useLocation();
  const [availableSlots, setAvailableSlots] = useState<AvailableSlotType[]>([]);

  const fetchAvailableSlots = async () => {
    const formattedDate = formatDate(selectedDate);

    const res = await userApi.get(
      `/slots?date=${formattedDate}&location=${selectedLocation}`
    );

    const data = res.data.data;

    setAvailableSlots(data.auditoriums);
  };

  const selectDate = (date: DateType) => {
    if (selectedDate.date != date.date) {
      setSelectedDate(date);
    }
  };

  const selectAudi = (audino: number) => {
    if (selectedAudi != audino) {
      setSelectedAudi(audino);
    }
  };

  useEffect(() => {
    setSlotInfo({
      date: selectedDate,
      audi: selectedAudi,
      noOfPerons: noOfPersons,
      startTime: startTime,
      endTime: startTime ? addTimes(startTime, totalTime) : null,
      own_duration: selectedDuration,
    });
  }, [selectedDate, selectedAudi, startTime, noOfPersons, selectedDuration]);

  useEffect(() => {
    setSelectedAudi(0);
    setStartTime(null);
    setSelectedDuration(null);
    setNoOfPerons(2);
  }, [selectedLocation]);

  useEffect(() => {
    fetchAvailableSlots();
  }, [selectedDate, selectedLocation]);

  return (
    <div className="w-full h-full lg:pr-4 lg:border-r lg:border-neutral-300 relative">
      {/* Dates */}
      <div className="overflow-x-scroll custom-scrollbar-thin  pb-1 lg:pb-2">
        <div className="flex items-center space-x-4">
          {getUpcomingDays(10).map((upcoming, index) => (
            <div
              onClick={() => {
                selectDate(upcoming);
              }}
              className={`flex flex-col items-center justify-center px-3 lg:px-5 py-1 lg:py-3 rounded-sm lg:rounded-lg  ${
                selectedDate?.date == upcoming.date
                  ? "bg-blue-600 text-white"
                  : "bg-fuchsia-100"
              } transition-all hover:scale-105 cursor-pointer`}
              key={index}
            >
              <p className="text-[8px] lg:text-[10px]">{upcoming.month}</p>
              <p className="font-semibold text-xs lg:text-base">
                {upcoming.date}
              </p>
              <p className="text-[8px] lg:text-[10px]">{upcoming.day}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Available timings */}
      <div className="flex flex-col items-center justify-center py-2 lg:py-4 px-2 lg:px-5 space-y-3 lg:space-y-6">
        <h3 className="text-sm lg:text-base font-bold">Choose a time</h3>

        <div className="overflow-x-scroll custom-scrollbar-thin pb-2 w-full">
          <div className="flex items-center space-x-3 lg:space-x-5">
            {SLOTS.map((time, index) => (
              <Timebox
                key={index}
                time={time}
                setTime={setStartTime}
                isSelected={
                  time.hour == startTime?.hour && time.type === startTime.type
                }
                isAvailable={isTimeAvailableForAudi(
                  availableSlots,
                  selectedAudi,
                  time
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* <div className="my-2 lg:my-4 flex items-center justify-center w-full">
        <div className="flex items-center w-full">
          <div
            className={`w-full text-[10px] lg:text-sm py-1 lg:py-2 text-center rounded-l-sm lg:rounded-l-lg border border-gray-300 cursor-pointer ${
              selectedLocation === "Sadar Bazar, Agra"
                ? "bg-gradient-to-b from-fuchsia-400 to-blue-500 text-white"
                : "bg-transparent text-black"
            }`}
            onClick={() => setSelectedLocation("Sadar Bazar, Agra")}
          >
            Sadar Bazar, Agra
          </div>
          <div
            className={`w-full text-[10px] lg:text-sm text-center py-1 lg:py-2 border-r border-t border-b border-gray-300 rounded-r-sm lg:rounded-r-lg cursor-pointer ${
              selectedLocation === "Fatehbad Road, Agra"
                ? "bg-gradient-to-b from-fuchsia-400 to-blue-500 text-white"
                : "bg-transparent text-black"
            }`}
            onClick={() => setSelectedLocation("Fatehbad Road, Agra")}
          >
            Fatehbad Road, Agra
          </div>
        </div>
      </div> */}

      {/* No. of persons */}
      <div className="flex items-center justify-center space-x-7 py-6">
        <p className="whitespace-nowrap text-sm lg:text-lg font-medium">
          No. of persons
        </p>
        <input
          type="number"
          value={noOfPersons}
          onChange={(e) => {
            const value = parseInt(e.target.value);

            if (value > 0 && value <= 5) setNoOfPerons(value);
          }}
          className="text-center border-b border-neutral-600 outline-none w-[20%] lg:w-[30%] text-sm lg:text-base"
        />
      </div>

      {/* Choose duration */}
      <div className="flex flex-col items-center justify-center py-2 lg:py-4 px-2 lg:px-5 space-y-3 lg:space-y-6">
        <h3 className="text-sm lg:text-base font-bold">Choose a duration</h3>

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
                if (selectedDuration === duration) setSelectedDuration(null);
                else setSelectedDuration(duration);
              }}
            >
              {duration}
            </div>
          ))}
        </div>
      </div>

      {/* Auditoriums */}

      <div className="flex flex-col items-center justify-center py-2 lg:py-4 px-2 lg:px-5 space-y-3 lg:space-y-5">
        <h3 className="text-sm lg:text-base font-bold">Choose an auditorium</h3>

        <div className="flex flex-col items-center justify-center space-y-3 lg:space-y-5">
          {["Sadar Bazar, Agra", "Fatehbad Road, Agra"].map(
            (location, index) => (
              <div key={index} className="flex flex-col items-center justify-center space-y-4">
                <p className="text-sm text-gray-500">{location}</p>

                <div className="flex items-center justify-center space-x-3 flex-wrap">
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
                        selectAudi(audino);
                      }}
                      className={`px-4 lg:px-5 py-2 lg:py-2 text-[10px] lg:text-sm  ${
                        audino == selectedAudi
                          ? "bg-blue-600 text-white"
                          : isAudiAvailable(availableSlots, audino + 1)
                          ? "bg-green-300"
                          : "bg-red-400"
                      } rounded-sm lg:rounded-lg shadow-2xs transition-all hover:scale-105 cursor-pointer`}
                      key={audino}
                    >
                      Audi {audino + 1}
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* {startTime && innerWidth >= 1024 && (
        <div className="w-full h-fit  absolute bottom-0 px-4  flex justify-center">
          <div className="bg-gradient-to-l from-blue-200 from-[50%] to-neutral-100 w-full h-full shadow-2xl rounded-lg flex flex-1  items-center justify-evenly px-6 py-4">
            <div className="flex-[0.2] flex flex-col items-start">
              <p className="text-neutral-800">Start Time</p>
              <p className="text-sm text-neutral-500">
                {timeObjToStr(startTime)}
              </p>
            </div>

            <div className="flex-[0.6] w-full h-[1px] border border-neutral-500 border-dashed"></div>

            <div className="flex-[0.2] flex flex-col items-end">
              {totalTime !== "0h 0m" && (
                <>
                  <p className="text-neutral-800">End Time</p>
                  <p className="text-sm text-neutral-500">
                    {timeObjToStr(addTimes(startTime, totalTime))}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default PickingSection;
