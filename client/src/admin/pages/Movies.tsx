import { useState } from "react";
import adminApi from "../../apis/adminApi";
import type { Movie } from "../../types/movie.type";
import { useEffect } from "react";
import MovieCard from "../components/MovieCard";
import AddMovieModal from "../components/Modals/AddMovieModal";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [stateFilter, setStateFilter] = useState<string>("");
  const [durationFilter, setDurationFilter] = useState<string>("");
  const [isAddMovieModalOpen, setIsAddMovieModalOpen] =
    useState<boolean>(false);

  const fetchMovies = async (state?: string, duration?: string) => {
    const res = await adminApi.get(
      `/movies?${state ? `state=${state}` : ""}${
        duration ? `&duration=${duration}` : ""
      }`
    );
    const data = res.data.data;
    return data;
  };

  const addMovie = async (movieId: string, state: string) => {

    try {
      const res = await adminApi.post("/add/movie", {
        movieId: movieId,
        state,
      });

      if (res.status === 200) {
        const data = res.data.data;
        toast.success("Movie added successfully");
        setMovies((prev) => [data, ...prev]);
      }
    } catch (error) {
      if(error instanceof AxiosError && error.response?.status === 409) {
        toast.error("Movie already exists");
      }else {
        toast.error("Something went wrong")
      }
    }finally{
      setIsAddMovieModalOpen(false);
    }
  };


  const removeMovie = async (movieId: number) => {
    const res = await adminApi.post("/remove/movie", {
        movieId,
    });   

    if (res.status === 200) {
        setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
    }
  }

  useEffect(() => {
    fetchMovies(stateFilter, durationFilter).then((data) => setMovies(data));
  }, [stateFilter, durationFilter]);

  return (
    <>
      <AddMovieModal
        isOpen={isAddMovieModalOpen}
        setIsOpen={setIsAddMovieModalOpen}
        actionFunc={addMovie}
      />

      <div className="w-full h-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Movies</h1>

          <button
            onClick={() => setIsAddMovieModalOpen(true)}
            className="w-fit px-4 py-2 rounded-lg text-xs bg-gradient-to-b from-fuchsia-500 to-blue-600 text-white transition cursor-pointer"
          >
            Add Movie
          </button>
        </div>

        <div className="mt-10">
          <div className="flex items-center space-x-5">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-[400px] px-4 py-2 rounded-lg border-2 border-neutral-800 text-neutral-800 cursor-pointer outline-none"
            />

            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-neutral-800 text-neutral-800 cursor-pointer outline-none"
            >
              <option value="">All Movies</option>
              <option value="NOW_SHOWING">Now Showing</option>
              <option value="COMING_SOON">Coming Soon</option>
              <option value="OTHER">Other</option>
            </select>

            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-neutral-800 text-neutral-800 cursor-pointer outline-none"
            >
              <option value="">All Durations</option>
              <option value="50m-1h 30m">1 Hour</option>
              <option value="1h 45m-2h 30m">2 Hours</option>
              <option value="2h 45m-3h 30m">3 Hours</option>
            </select>
          </div>
        </div>

        <div className="mt-10">
          {movies.length > 0 ? (
            <div className="w-full overflow-y-scroll custom-scrollbar">
            <div className="flex items-center gap-5 flex-wrap custom-scrollbar h-[450px] pb-[500px]">
              {movies.map((movie) => (
                <div key={movie.id}>
                  <MovieCard movieInfo={movie} actionFunc={removeMovie} />
                </div>
              ))}
            </div>
            </div>
          ) : (
            <p>No movies found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Movies;
