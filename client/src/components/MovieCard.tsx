import toast from "react-hot-toast";
import userApi from "../apis/userApi";
import type { Movie } from "../types/movie.type";

const MovieCard = ({
  width = "200px",
  height = "280px",
  titleSize = "0.8rem",
  movieInfo,
  type = "normal",
  setCurrentMovies,
}: {
  width?: string;
  height?: string;
  titleSize?: string;
  movieInfo: Movie;
  type?: "normal" | "browse";
  setCurrentMovies?: React.Dispatch<React.SetStateAction<Movie[]>>;
}) => {
  const addMovie = async () => {
    if (type != "browse") {
      throw new Error("Movie can't be added");
      return;
    };

    const res = await userApi.get("/movie/" + movieInfo.id);

    if (res.status == 200 && res.data) {
      const movie = res.data.data;

      localStorage.setItem(
        "browse-movies",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("browse-movies") || "[]"),
          {
            ...movie,
            state: "BROWSED",
          },
        ])
      );
    } else {
      throw new Error("Movie can't be added");
    }
  };

  const removeMovie = async () => {

    const movies = JSON.parse(localStorage.getItem("browse-movies") || "[]");

    localStorage.setItem(
      "browse-movies",
      JSON.stringify(movies.filter((movie: Movie) => movie.id != movieInfo.id))
    );

    setCurrentMovies?.((movies) => (
      [...movies.filter((movie) => movie.id != movieInfo.id)]
    )
    );
  };

  return (
    <div
      className={` bg-slate-400 rounded-lg shrink-0 bg-cover ${
        type == "normal" && "cursor-pointer"
      } transition-all hover:scale-105 relative`}
      style={{
        width,
        height,
        backgroundImage: `url(${movieInfo.poster_url})`,
      }}
    >
      {type == "browse" && (
        <div
          className={`absolute top-2 right-2 flex items-center justify-center py-1 px-7 rounded-sm bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white font-semibold text-xs ${
            type == "browse" && "cursor-pointer"
          }`}
          onClick={() => {
            toast.promise(addMovie(), {
              loading: "Adding movie...",
              success: "Movie added successfully",
              error: "Movie can't be added",
            });
          }}
        >
          <p>Add</p>
        </div>
      )}

      {movieInfo.state == "BROWSED" && (
        <div
          className={`absolute top-2 left-2 flex items-center justify-center py-1 px-4 rounded-sm bg-red-500 text-white font-semibold text-[9px] ${
            type == "browse" && "cursor-pointer"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toast.promise(removeMovie(), {
              loading: "Removing movie...",
              success: "Movie removed successfully",
              error: "Movie can't be removed",
            });
          }}
        >
          <p>Remove</p>
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
        {type === "normal" && (
          <p className="text-[0.6rem] text-white">{movieInfo.duration}</p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
