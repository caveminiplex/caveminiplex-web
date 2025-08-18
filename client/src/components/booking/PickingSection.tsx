import { useEffect, useState } from "react";
import {
  addTimes,
  getUpcoming10Days,
  timeObjToStr,
} from "../../util/time.util";
import Timebox from "../Timebox";

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
};

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
];

const PickingSection = ({
  setSlotInfo,
  totalTime,
}: {
  totalTime: string;
  setSlotInfo: React.Dispatch<React.SetStateAction<SlotType | null>>;
}) => {
  const [selectedDate, setSelectedDate] = useState<DateType | null>(null);
  const [selectedAudi, setSelectedAudi] = useState<number | null>(null);
  const [noOfPersons, setNoOfPerons] = useState<number>(2);
  const [startTime, setStartTime] = useState<TimeType | null>(null);

  const selectDate = (date: DateType) => {
    if (selectedDate != null && selectedDate.date == date.date) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
  };

  const selectAudi = (audino: number) => {
    if (selectedAudi != null && selectedAudi == audino) {
      setSelectedAudi(null);
    } else {
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
    });
  }, [selectedDate, selectedAudi, startTime, noOfPersons]);

  return (
    <div className="w-full h-full pr-4 border-r border-neutral-300 relative">
      {/* Dates */}
      <div className="overflow-x-scroll pb-2 custom-scrollbar-thin">
        <div className="flex items-center space-x-4">
          {getUpcoming10Days().map((upcoming, index) => (
            <div
              onClick={() => {
                selectDate(upcoming);
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

      {/* Rooms */}
      <div className="flex items-center justify-center space-x-3 space-y-3 mt-7 flex-wrap">
        {[0, 1, 2, 3, 4].map((audino) => (
          <div
            onClick={() => {
              selectAudi(audino);
            }}
            className={`px-8 py-3  ${
              audino == selectedAudi
                ? "bg-blue-600 text-white"
                : "bg-fuchsia-100"
            } rounded-lg shadow-2xs transition-all hover:scale-105 cursor-pointer`}
            key={audino}
          >
            Audi {audino + 1}
          </div>
        ))}
      </div>

      {/* No. of persons */}
      <div className="flex items-center justify-center space-x-7 py-10">
        <p className="whitespace-nowrap text-lg font-medium">No. of persons</p>
        <input
          type="number"
          value={noOfPersons}
          onChange={(e) => {
            const value = parseInt(e.target.value);

            if (value > 0 && value <= 5) setNoOfPerons(value);
          }}
          className="text-center border-b border-neutral-600 outline-none w-[30%]"
        />
      </div>

      {/* Available timings */}
      <div className="flex flex-col items-center justify-center py-4 px-5 space-y-6">
        <h3 className="font-bold">Choose a time</h3>

        <div className="flex items-center justify-center flex-wrap gap-7">
          {SLOTS.map((time, index) => (
            <Timebox
              key={index}
              time={time}
              setTime={setStartTime}
              isSelected={
                time.hour == startTime?.hour && time.type === startTime.type
              }
            />
          ))}
        </div>

        <p className="text-[11px] text-neutral-400 text-center">
          * Please choose a start time based on the above availability *
        </p>
      </div>

      {startTime && (
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
      )}
    </div>
  );
};

export default PickingSection;
