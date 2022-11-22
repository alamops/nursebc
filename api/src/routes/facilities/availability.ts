import { FacilitiesRepository } from './utils/repository';
import { Request, Response } from "express";

export default async (_: Request, response: Response) => {
  response
    .status(200)
    .send(await new FacilitiesRepository().getAvailableSpots())
};
