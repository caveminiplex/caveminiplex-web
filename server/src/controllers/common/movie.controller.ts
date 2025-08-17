import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { StatusCodes } from "http-status-codes";
import { tmdbCall } from "../../utils/tmdbAPI";
import { dynamoDocClient } from "../../db/db";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
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

export const fetchAddedMovies = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const result = await dynamoDocClient.send(
        new ScanCommand({
          TableName: "movies",
        })
      );

      // If no items found, return empty array
      const movies = result.Items || [];

      res.status(StatusCodes.OK).json({
        message: "Fetched movies successfully",
        data: movies,
      });
    } catch (err) {
      console.error("Error fetching movies:", err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to fetch movies" });
    }
  }
);
