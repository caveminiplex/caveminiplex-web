import type { Snack } from "../types/snack.type";

const SnackCard = ({
  width = "150px",
  height = "180px",
  snackInfo,
}: {
  width?: string;
  height?: string;
  snackInfo: Snack;
}) => {
  return (
    <div
      className=" bg-slate-400 rounded-lg shrink-0 bg-cover transition-all hover:scale-105 relative flex flex-col"
      style={{
        width,
        height,
      }}
    >
      <div className="flex-[0.8] w-full h-full relative">
        <img
          src={snackInfo.img_url}
          alt="Snack image"
          className="w-full h-full object-cover rounded-t-lg brightness-90"
        />

        <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-between">
          <div className="w-full bg-gradient-to-r from-neutral-700 to-transparent px-2 py-1 rounded-tl-lg">
            <h2 className="text-white">{snackInfo.name}</h2>
          </div>

          <div className="flex justify-end px-2 py-1">
            <div className="bg-gradient-to-l from-green-600 from-75% to-transparent text-white text-sm px-4 rounded-sm shadow-2xl font-bold">
              <p>₹ {snackInfo.price}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-[0.2] w-full h-full">
        <button className="w-full h-full bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white text-sm cursor-pointer rounded-b-lg">
          Add
        </button>
      </div>
    </div>
  );
};

export default SnackCard;
