import { useState } from "react";
import Loader from "../../../components/Loader";

const AddMovieModal = ({
  isOpen,
  setIsOpen,
  actionFunc,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  actionFunc: (movieId: string, state: string) => Promise<void>;
}) => {
  const [movieId, setMovieId] = useState<string>("");
  const [state, setState] = useState<string>("NOW_SHOWING");

  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div
      className="absolute top-0 left-0 w-full h-screen z-50 flex items-center justify-center backdrop-brightness-75"
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div
        className="w-fit h-fit flex flex-col items-center justify-center bg-white px-16 py-20 rounded-lg"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex flex-col items-center space-y-7">
          <input
            type="text"
            placeholder="Movie ID"
            className="px-4 py-2 rounded-lg border-2 border-neutral-800 text-neutral-800 cursor-pointer outline-none w-full"
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
          />
          <select
            name=""
            id=""
            className="px-4 py-2 rounded-lg border-2 border-neutral-800 text-neutral-800 cursor-pointer outline-none w-full"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="NOW_SHOWING">NOW_SHOWING</option>
            <option value="COMING_SOON">COMING_SOON</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>

        <button
          className={`px-8 py-2 rounded-lg text-sm bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white transition mt-12 flex items-center justify-center ${
            movieId && state && !loading
              ? "opacity-100 cursor-pointer"
              : "cursor-not-allowed opacity-70"
          }`}
          onClick={async () => {
            if (movieId && state && !loading) {
              setLoading(true);
              await actionFunc(movieId, state);
            }
            setLoading(false);
          }}
        >
          {loading ? <Loader color="white" /> : "Add Movie"}
        </button>
      </div>
    </div>
  );
};

export default AddMovieModal;
