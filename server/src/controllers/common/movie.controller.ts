import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { StatusCodes } from "http-status-codes";
import { tmdbCall } from "../../utils/tmdbAPI";

export const searchMovie = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query.search;

  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

  try {
    const data = await tmdbCall(url);

    if (data)
      res.status(StatusCodes.OK).json({
        message: "Successfully fetched",
        data,
      });
    else throw new Error("Couldn't fetch movies");
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch movies" });
  }
});

export const fetchAddedMovies = asyncHandler(
  async (req: Request, res: Response) => {}
);
