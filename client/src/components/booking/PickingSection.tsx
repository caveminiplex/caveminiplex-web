import { useEffect, useState } from "react";
import { getUpcoming10Days } from "../../util/time.util";

export type DateType = {
  month: string;
  date: number;
  day: string;
};

export type StartTimeType = {
  hour: number;
  min: number;
  type: "AM" | "PM";
};

export type SlotType = {
  date: DateType | null;
  audi: number | null;
  noOfPerons: number;
  startTime: StartTimeType;
};

const PickingSection = ({
  setSlotInfo,
}: {
  setSlotInfo: React.Dispatch<React.SetStateAction<SlotType | null>>;
}) => {
  const [selectedDate, setSelectedDate] = useState<DateType | null>(null);
  const [selectedAudi, setSelectedAudi] = useState<number | null>(null);
  const [noOfPersons, setNoOfPerons] = useState<number>(2);
  const [startTime, setStartTime] = useState<StartTimeType>({
    hour: 9,
    min: 0,
    type: "AM",
  });

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
    });
  }, [selectedDate, selectedAudi, startTime, noOfPersons]);

  return (
    <div className="w-full h-full pr-4 border-r border-neutral-300">
      {/* Dates */}
      <div className="overflow-x-scroll pb-2 custom-scrollbar-thin">
        <div className="flex items-center space-x-4">
          {getUpcoming10Days().map((upcoming, index) => (
            <div
              onClick={() => {
                selectDate(upcoming);
              }}
              className={`flex flex-col items-center justify-center px-5 py-3 rounded-lg  ${
                selectedDate?.day == upcoming.day
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
      <div className="flex flex-col items-center justify-center py-4 space-y-6">
        <h3 className="font-bold">Available Timings</h3>

        <div className="flex items-center justify-center flex-wrap ">
          {[
            {
              startTime: "9:00 AM",
              endTime: "9:00 PM",
            },
          ].map((timings, index) => (
            <div
              key={index}
              className="text-[10px] px-3 py-1 rounded-sm bg-green-300"
            >
              {timings.startTime} to {timings.endTime}
            </div>
          ))}
        </div>

        <p className="text-[9px] text-neutral-400 text-center">
          * Please choose a start time based on the above availability *
        </p>
      </div>

      {/* starttime and endtime */}
      <div className="flex items-center justify-center space-x-7 py-10">
        <p className="whitespace-nowrap text-lg font-medium">Start Time</p>

        <div className="flex items-center space-x-5">
          <input
            type="number"
            value={startTime.hour}
            onChange={(e) => {
              const hour = parseInt(e.target.value);

              if (hour <= 0) return;

              if (hour > 12)
                setStartTime({
                  ...startTime,
                  hour: hour - 12,
                });
              else
                setStartTime({
                  ...startTime,
                  hour: hour,
                });
            }}
            className="text-center border-b border-neutral-600 outline-none w-[50px]"
          />
          <p>:</p>
          <input
            type="number"
            value={startTime.min}
            onChange={(e) => {
              const min = parseInt(e.target.value);

              if (min < 0) return;

              if (min > 60)
                setStartTime({
                  ...startTime,
                  min: 0,
                });
              else
                setStartTime({
                  ...startTime,
                  min: min,
                });
            }}
            className="text-center border-b border-neutral-600 outline-none w-[50px]"
          />

          <div className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => {
                setStartTime({
                  ...startTime,
                  type: "AM",
                });
              }}
              className={`px-2 py-1 rounded-sm  border border-neutral-400 transition-all hover:scale-105 cursor-pointer ${
                startTime.type === "AM"
                  ? "bg-blue-600 text-white"
                  : "bg-fuchsia-100 text-black"
              }`}
            >
              AM
            </button>
            <button
              onClick={() => {
                setStartTime({
                  ...startTime,
                  type: "PM",
                });
              }}
              className={`px-2 py-1 rounded-sm border border-neutral-400 transition-all hover:scale-105 cursor-pointer ${
                startTime.type === "PM"
                  ? "bg-blue-600 text-white"
                  : "bg-fuchsia-100 text-black"
              }`}
            >
              PM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickingSection;
