import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/movie.type";
import userApi from "../apis/userApi";

const BrowseMovies = () => {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 0) {
        fetchMovies(query);
      } else {
        setMovies([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchMovies = async (searchTerm: string) => {
    try {
      setLoading(true);

      const res = await userApi.get(
        `/movie/search?search=${encodeURIComponent(searchTerm)}`
      );

      if (res.status == 200 && res.data) {
        setMovies(res.data.data);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen px-7 py-12 bg-gradient-to-b from-indigo-50 to-blue-100">
      <h1 className="text-center text-2xl mb-7">Browse Movies</h1>
      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-6 py-3 rounded-lg shadow-lg border border-gray-300 focus:outline-none text-lg"
        />
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-600 text-xl">Loading movies...</p>
      )}

      {/* Movie Results */}
      <div className="overflow-y-scroll h-[500px] pt-5 pb-40 custom-scrollbar-thin">
        <div className="flex justify-center gap-8 flex-wrap">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movieInfo={movie} type="browse" />
          ))}
        </div>
      </div>

      {/* No results */}
      {!loading && query.trim().length > 0 && movies.length === 0 && (
        <p className="text-center text-gray-600 text-xl mt-10">
          No movies found for "{query}"
        </p>
      )}
    </div>
  );
};

export default BrowseMovies;
