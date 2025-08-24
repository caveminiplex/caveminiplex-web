import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { StatusCodes } from "http-status-codes";
import { tmdbCall } from "../../utils/tmdbAPI";
import { Movie } from "../../db/types/movie.type";
import { dynamoDocClient } from "../../db/db";
import { DeleteCommand, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

export const addMovie = asyncHandler(async (req: Request, res: Response) => {
  const movieId = req.body.movieId;
  const state = req.body.state;

  if (!movieId || !state)
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "movieId and state is required" });

  const url = `https://api.themoviedb.org/3/movie/${movieId}`;

  try {
    // Check if movie already exists
    const existingMovie = await dynamoDocClient.send(
      new GetCommand({
        TableName: "movies",
        Key: { id: Number(movieId) },
      })
    );

    if (existingMovie.Item) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ 
          error: "Movie already exists",
          message: `Movie with ID ${movieId} is already added to the system`,
          existingMovie: existingMovie.Item
        });
    }

    const data = await tmdbCall(url);

    if (!data) {
      throw new Error("Couldn't fetch movie details");
    }

    const movie: Movie = {
      id: data.id,
      title: data.title,
      duration: data.runtime
        ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
        : "N/A",
      poster_url: `https://image.tmdb.org/t/p/original${data.poster_path}`,
      state,
    };

    await dynamoDocClient.send(
      new PutCommand({
        TableName: "movies",
        Item: movie,
      })
    );

    res
      .status(StatusCodes.OK)
      .json({ message: "Movie added successfully", data: movie });
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to add movie" });
  }
});

export const removeMovie = asyncHandler(async (req: Request, res: Response) => {
  const movieId = req.body.movieId;

  if (!movieId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "movieId is required" });
  }

  try {
    await dynamoDocClient.send(
      new DeleteCommand({
        TableName: "movies",
        Key: { id: Number(movieId) },
      })
    );

    res.status(StatusCodes.OK).json({
      message: `Movie with ID ${movieId} removed successfully`,
    });
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to remove movie" });
  }
});
