import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { StatusCodes } from "http-status-codes";

const addMovie = asyncHandler(async (req: Request, res: Response) => {
  const transactionID: string = req.body.transactionID;
  const movieIds: string[] = req.body.movieIds;

  // Validation
  if (!transactionID) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Transaction ID is not provided" });
  }

  try {
  } catch (e) {}

  res.status(StatusCodes.OK).json({ message: "Movie booked successfully" });
});

export default addMovie;
