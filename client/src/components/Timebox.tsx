import { useRef } from "react";
import type { TimeType } from "./booking/PickingSection";
import toast from "react-hot-toast";

// const MINUTES = [0, 15, 30, 45];

const Timebox = ({
  time,
  isSelected,
  isAvailable,
  setTime,
}: {
  time: TimeType;
  isSelected: boolean;
  isAvailable: boolean;
  setTime: React.Dispatch<React.SetStateAction<TimeType>>;
}) => {
//   const [isHover, setIsHover] = useState<boolean>(false);
//   const [position, setPosition] = useState({ top: 0, left: 0 });
//   const [isMinuteDivClicked, setIsMinuteDivClicked] = useState<boolean>(false);
//   const [selectedMinute, setSelectedMinute] = useState<number>(0);

  const divRef = useRef<HTMLDivElement>(null);

//   const handleMouseOver = () => {
//     if (divRef.current) {
//       const rect = divRef.current.getBoundingClientRect();
//       setPosition({
//         top: rect.top - 60,
//         left: rect.left + rect.width / 2,
//       });
//     }

//     setIsMinuteDivClicked(false);
//     setIsHover(true);
//   };

  return (
    <div className="relative">
      {/* {(isHover || isSelected) &&
        !isMinuteDivClicked &&
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
                onClick={() => {
                  setSelectedMinute(minute);

                  setTime((value) => {
                    return {
                      ...value,
                      min: minute,
                    } as TimeType;
                  });

                  setIsMinuteDivClicked(true);
                }}
                key={index}
                className={`border border-neutral-300 ${
                  selectedMinute === minute && "bg-blue-600 text-white"
                } rounded-sm px-2 py-1 cursor-pointer transition-all hover:scale-105`}
              >
                {minute}
              </div>
            ))}
          </div>,
          document.body
        )} */}

      <div
        ref={divRef}
        className={`text-[8px] lg:text-[10px] px-3 py-2 rounded-sm ${
          isSelected
            ? "bg-blue-600 text-white"
            : isAvailable
            ? "bg-green-300 text-black"
            : "bg-red-400 text-white"
        } cursor-pointer transition-all hover:scale-105 flex-nowrap whitespace-nowrap`}
        onClick={() => {

          if (!isAvailable) {
            toast.error("Time is not available. Please select another time.", {
              className:"text-center"
            });
            return;
          };

          setTime(time);
        }}
      >
        {time.hour} {time.type}
      </div>
    </div>
  );
};

export default Timebox;
