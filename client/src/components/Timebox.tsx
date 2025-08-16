import { useRef, useState } from "react";
import type { TimeType } from "./booking/PickingSection";
import { timeObjToStr } from "../util/time.util";
import { createPortal } from "react-dom";

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
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseOver = () => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 60,
        left: rect.left + rect.width / 2,
      });
    }
    setIsHover(true);
  };

  return (
    <div className="relative">
      {isHover &&
        createPortal(
          <div
            className="absolute shadow-2xl  px-5 py-2 rounded-lg bg-white h-fit w-fit flex items-center space-x-3 z-50"
            style={{
              top: position.top,
              left: position.left,
              transform: "translateX(-50%)",
            }}
          >
            {MINUTES.map((minute, index) => (
              <div
                key={index}
                className="border border-neutral-300 rounded-sm px-2 py-1"
              >
                {minute}
              </div>
            ))}
          </div>,
          document.body
        )}

      <div
        ref={divRef}
        className={`text-xs px-3 py-2 rounded-sm  ${
          isSelected ? "bg-blue-600 text-white " : "bg-green-300 text-black"
        } cursor-pointer transition-all hover:scale-105`}
        onClick={() => {
          setTime((value) => {
            if (value?.hour == time.hour && value.type === time.type)
              return null;
            return time;
          });
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={(_e) => {
          setIsHover(false);
        }}
      >
        {timeObjToStr(time)}
      </div>
    </div>
  );
};

export default Timebox;
