import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/movie.type";

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
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchMovies = async (searchTerm:string) => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&query=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();

      if (data.results) {
        setMovies(data.results);
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
    <div className="w-full min-h-screen px-10 py-12 bg-gradient-to-b from-indigo-50 to-blue-100">

        <h1 className="text-center text-2xl mb-10">Browse Movies</h1>
      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-6 py-4 rounded-2xl shadow-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg"
        />
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-600 text-xl">Loading movies...</p>
      )}

      {/* Movie Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movieInfo={movie}
          />
        ))}
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
