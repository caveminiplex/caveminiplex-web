import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { StatusCodes } from "http-status-codes";
import { tmdbCall } from "../../utils/tmdbAPI";
import { dynamoDocClient } from "../../db/db";
import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Movie } from "../../db/types/movie.type";

export const searchMovie = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query.search;

  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

  try {
    const data = await tmdbCall(url);

    const filteredData = data.results
      .filter((movie: any) => movie.poster_path != null)
      .map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
      }));

    if (data)
      res.status(StatusCodes.OK).json({
        message: "Successfully fetched",
        data: filteredData,
      });
    else throw new Error("Couldn't fetch movies");
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch movies" });
  }
});

// Helper function to parse duration string to minutes
const parseDurationToMinutes = (duration: string): number => {
  const regex = /(?:(\d+)h)?\s*(?:(\d+)m)?/;
  const match = duration.match(regex);

  if (!match) return 0;

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);

  return hours * 60 + minutes;
};

// Helper function to parse duration range
const parseDurationRange = (
  rangeStr: string
): { min: number; max: number } | null => {
  // Check if it's a range (contains dash)
  if (rangeStr.includes("-")) {
    const [minStr, maxStr] = rangeStr.split("-").map((s) => s.trim());
    const min = parseDurationToMinutes(minStr);
    const max = parseDurationToMinutes(maxStr);

    if (min > 0 && max > 0 && min <= max) {
      return { min, max };
    }
  }

  // If not a range, treat as single duration with 15-minute tolerance
  const duration = parseDurationToMinutes(rangeStr);
  if (duration > 0) {
    return { min: duration - 15, max: duration + 15 };
  }

  return null;
};

// Helper function to check if duration matches filter range
const matchesDurationFilter = (
  movieDuration: string,
  filterDuration: string
): boolean => {
  const movieMinutes = parseDurationToMinutes(movieDuration);
  const range = parseDurationRange(filterDuration);

  if (!range || movieMinutes <= 0) return false;

  return movieMinutes >= range.min && movieMinutes <= range.max;
};

export const fetchAddedMovies = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { duration, state } = req.query;

      const result = await dynamoDocClient.send(
        new ScanCommand({
          TableName: "movies",
        })
      );

      // If no items found, return empty array
      let movies = (result.Items || []) as Movie[];

      // Apply filters if provided
      if (duration && typeof duration === "string") {
        movies = movies.filter((movie) =>
          matchesDurationFilter(movie.duration, duration)
        );
      }

      if (state && typeof state === "string") {
        const stateFilter = state.toUpperCase();
        movies = movies.filter(
          (movie) => movie.state.toUpperCase() === stateFilter
        );
      }

      res.status(StatusCodes.OK).json({
        message: "Fetched movies successfully",
        data: movies,
        filters: {
          duration: duration || null,
          state: state || null,
          totalResults: movies.length,
        },
      });
    } catch (err) {
      console.error("Error fetching movies:", err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch movies" });
    }
  }
);

export const getMovieById = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id)
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Movie ID is required" });

      const movie = await tmdbCall(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`
      );

      if (!movie) throw new Error("Movie not found");

      // await dynamoDocClient.send(
      //   new PutCommand({
      //     TableName: "movies",
      //     Item: {
      //       id: movie.id,
      //       title: movie.title,
      //       poster_url: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
      //       duration: movie.runtime
      //         ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
      //         : "N/A",
      //     },
      //   })
      // );

      res.status(StatusCodes.OK).json({
        message: "Fetched movie successfully",
        data: {
          id: movie.id,
          title: movie.title,
          poster_url: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
          duration: movie.runtime
            ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
            : "N/A",
        },
      });
    } catch (err) {
      console.error("Error fetching movie:", err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch movie" });
    }
  }
);
