import { useEffect, useState } from "react";
import type { Movie } from "../../types/movie.type";
import MovieCard from "../MovieCard";
import { calculateTotalTime } from "../../util/time.util";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../../pages/Home";
import { IoIosMusicalNote } from "react-icons/io";

const MoviesListing = ({
  selectedMovies,
  setSelectedMovies,
  setTotalTime,
  ownDuration,
}: {
  setTotalTime: React.Dispatch<React.SetStateAction<string>>;
  selectedMovies: Movie[];
  setSelectedMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  ownDuration: string | null;
}) => {
  const navigate = useNavigate();

  const [currentMovies, setCurrentMovies] = useState<Movie[]>([]);

  const fetchCurrentMovies = async () => {
    if (ownDuration === "1h") return;

    const data = await fetchMovies("NOW_SHOWING", ownDuration ?? "");
    setCurrentMovies(data);
  };

  useEffect(() => {
    fetchCurrentMovies();

    setSelectedMovies([]);
  }, [ownDuration]);

  useEffect(() => {
    if (ownDuration) setTotalTime(ownDuration);
    else
      setTotalTime(
        calculateTotalTime(selectedMovies.map((movie) => movie.duration))
      );
  }, [selectedMovies, ownDuration]);

  const selectMovie = (movie: Movie) => {
    if (selectedMovies.map((movie) => movie.id).includes(movie.id)) {
      const arr = selectedMovies.filter(
        (selectedMovie) => selectedMovie.id != movie.id
      );

      setSelectedMovies([...arr]);
    } else {
      setSelectedMovies([...selectedMovies, movie]);
    }
  };

  return (
    <div
      className={` h-full custom-scrollbar-thin relative ${
        ownDuration === "1h" ? "overflow-y-hidden" : "overflow-y-scroll"
      }`}
    >
      <div className="w-full sticky top-0 flex items-center justify-center py-3 z-30">
        <button
          onClick={() => {
            navigate("/browse");
          }}
          className="w-full py-3 mx-3 rounded-xl font-medium bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white transition text-sm cursor-pointer"
        >
          Browse movies
        </button>
      </div>

      {currentMovies.length === 0 ? (
        <div className="flex w-full justify-center mt-5">
          <p className="text-center text-neutral-600">No movies found</p>
        </div>
      ) : (
        <div className={` h-full grid grid-cols-2 gap-5 relative`}>
          {ownDuration === "1h" ? (
            <div className="absolute flex flex-col space-y-5 items-center justify-center top-0 left-0 w-full h-full bg-black/60 backdrop-brightness-70 z-30 rounded-lg">
              <IoIosMusicalNote className="text-white text-5xl" />

              <div className="flex flex-col items-center justify-center space-y-2">
                <p className="text-white text-center text-xl">Only Songs</p>

                <p className="text-neutral-200 text-center">
                  Can't select movies in 1 hour duration
                </p>
              </div>
            </div>
          ) : null}

          {currentMovies.map((movie) => (
            <div
              className={`w-fit h-fit relative`}
              key={movie.id}
              onClick={() => {

                if(ownDuration == "1h") return;

                if(!ownDuration)
                  selectMovie(movie);
                else {
                  setSelectedMovies([movie]);
                }
              }}
            >
              <div className="absolute top-2 right-2 z-20">
                <div
                  className={`w-[15px] h-[15px] rounded-full border border-neutral-800 ${
                    selectedMovies.map((movie) => movie.id).includes(movie.id)
                      ? "bg-blue-600"
                      : "bg-white"
                  }`}
                ></div>
              </div>
              <MovieCard
                width="150px"
                height="200px"
                titleSize="0.7rem"
                movieInfo={movie}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesListing;
