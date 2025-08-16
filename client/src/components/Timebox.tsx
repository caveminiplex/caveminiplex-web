import { useState } from "react";
import type { TimeType } from "./booking/PickingSection";

const MINUTES = [0, 15, 30, 45];

const Timebox = ({
  time,
  isSelected,
  setTime,
}: {
  time: TimeType;
  isSelected: boolean;
  setTime: React.Dispatch<React.SetStateAction<TimeType | null>>;
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div className="relative">
      {isHover && (
        <div className="absolute shadow-2xl  px-5 py-2 rounded-lg bg-white h-fit -mt-14 -translate-x-1/5 w-fit flex items-center space-x-3 z-50">
          {MINUTES.map((minute, index) => (
            <div
              key={index}
              className="border border-neutral-300 rounded-sm px-2 py-1"
            >
              {minute}
            </div>
          ))}
        </div>
      )}

      <div
        className={`text-xs px-3 py-2 rounded-sm  ${
          isSelected ? "bg-blue-600 text-white " : "bg-green-300 text-black"
        } cursor-pointer transition-all hover:scale-105`}
        onClick={() => {
          setTime((value) => {
            if (value) return null;
            return time;
          });
        }}
        onMouseOver={(_e) => {
          setIsHover(true);
        }}
        onMouseOut={(_e) => {
          setIsHover(false);
        }}
      >
        {time?.hour}:{time.min < 10 ? `0${time.min}` : time.min} {time?.type}
      </div>
    </div>
  );
};

export default Timebox;
