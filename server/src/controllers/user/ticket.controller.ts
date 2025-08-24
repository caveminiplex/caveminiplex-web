import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { StatusCodes } from "http-status-codes";

export const bookTicket = asyncHandler(async (req: Request, res: Response) => {
  const transactionID: string = req.body.transactionID;
  const movieIds: string[] = req.body.movieIds;

  if (!transactionID) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Transaction ID is not provided" });
  }

  try {
    
  } catch (e) {
    console.log(e);
  }

  res.status(StatusCodes.OK).json({ message: "Movie booked successfully" });
});
