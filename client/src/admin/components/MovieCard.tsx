import type { Movie } from "../../types/movie.type";
import { useState } from "react";
import ConfirmationModal from "./Modals/ConfirmationModal"; 


const MovieCard = ({
  width = "200px",
  height = "280px",
  titleSize = "0.8rem",
  movieInfo,
  actionFunc,
}: {
  width?: string;
  height?: string;
  titleSize?: string;
  movieInfo: Movie;
  actionFunc: (movieId: number) => Promise<void>;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  
  const removeMovie = async () => {
    await actionFunc(movieInfo.id);
    setIsDeleteModalOpen(false);
  }

  return (
    <>

    <ConfirmationModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        actionFunc={removeMovie}
        text="Are you sure you want to delete this movie?"
        btnText="Delete"
    />

    <div
      className=" bg-slate-400 rounded-lg shrink-0 bg-cover cursor-pointer transition-all hover:scale-105 relative"
      style={{
        width,
        height,
        backgroundImage: `url(${movieInfo.poster_url})`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className=" absolute top-2 right-2 flex items-center space-x-2">
          <button onClick={() => setIsDeleteModalOpen(true)} className="px-2 py-2 rounded-lg text-xs bg-red-500 text-white">
            Delete
          </button>
        </div>
      )}

      <div className="absolute bottom-0 w-full right-0 py-3 px-3 text-start backdrop-blur-xs space-y-1 rounded-b-lg backdrop-brightness-30">
        <h2
          className="text-white font-bold"
          style={{
            fontSize: titleSize,
          }}
        >
          {movieInfo.title}
        </h2>
        <p className="text-[0.6rem] text-white">{movieInfo.duration}</p>
      </div>
    </div>
    </> 
  );
};

export default MovieCard;
