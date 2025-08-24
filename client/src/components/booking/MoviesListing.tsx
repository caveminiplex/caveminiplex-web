import { useEffect, useState } from "react";
import type { Movie } from "../../types/movie.type";
import MovieCard from "../MovieCard";
import { calculateTotalTime } from "../../util/time.util";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../../pages/Home";

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
   const data = await fetchMovies("NOW_SHOWING")
   setCurrentMovies(data)
  };

  useEffect(() => {
    fetchCurrentMovies()
  }, []);

  useEffect(() => {

    if(ownDuration)
        setTotalTime(ownDuration)
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
    <div className="overflow-y-scroll h-full custom-scrollbar-thin relative">
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
      <div className={`grid grid-cols-2 gap-5 ${ownDuration === "1h" && "blur-[2px]"}`}>
        {currentMovies.map((movie) => (
          <div
            className={`w-fit h-fit relative`}
            key={movie.id}
            onClick={() => {
              selectMovie(movie);
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
    </div>
  );
};

export default MoviesListing;
