import { useEffect, useState } from "react";
import type { Movie } from "../../types/movie.type";
import MovieCard from "../MovieCard";
import { calculateTotalTime } from "../../util/time.util";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../../pages/Home";
import SongCard from "../SongCard";

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

    const addedBrowsedMovies = JSON.parse(
      localStorage.getItem("browse-movies") || "[]"
    );

    setCurrentMovies([...addedBrowsedMovies, ...data]);
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
      } overflow-y-hidden lg:overflow-y-scroll`}
    >
      <div className="hidden lg:flex w-full sticky top-0 items-center justify-center py-3 z-30">
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
        <div className={` h-full flex items-center lg:grid lg:grid-cols-2 gap-5 relative`}>
          {ownDuration === "1h" ? (
            <div
              className={`w-fit h-fit relative`}
              key={"songs"}
              onClick={() => {
                if (ownDuration == "1h")
                  selectMovie({
                    id: -4,
                    title: "Songs",
                    duration: "1h",
                    poster_url: "",
                    state: "",
                  });
              }}
            >
              <div className="absolute top-2 right-2 z-20">
                <div
                  className={`w-[15px] h-[15px] rounded-full border border-neutral-800 ${
                    selectedMovies.map((movie) => movie.id).includes(-4)
                      ? "bg-blue-600"
                      : "bg-white"
                  }`}
                ></div>
              </div>
              <SongCard width="150px" height="200px" />
            </div>
          ) : (
            currentMovies.map((movie) => (
              <div
                className={`w-fit h-fit relative`}
                key={movie.id}
                onClick={() => {
                  if (ownDuration == "1h") return;

                  if (!ownDuration) selectMovie(movie);
                  else {
                    setSelectedMovies([movie]);
                  }
                }}
              >
                <div className="absolute top-2 right-2 z-20">
                  <div
                    className={`w-[10px] h-[10px] lg:w-[15px] lg:h-[15px] rounded-full border border-neutral-800 ${
                      selectedMovies.map((movie) => movie.id).includes(movie.id)
                        ? "bg-blue-600"
                        : "bg-white"
                    }`}
                  ></div>
                </div>
                <MovieCard
                  width={innerWidth < 1024 ? "90px" : "150px"}
                  height={innerWidth < 1024 ? "120px" : "200px"}
                  titleSize={innerWidth < 1024 ? "0.4rem" : "0.7rem"}
                  movieInfo={movie}
                  setCurrentMovies={setCurrentMovies}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MoviesListing;
