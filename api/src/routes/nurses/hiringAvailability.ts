import { Request, Response } from "express";
import { NursesRepository } from "./utils/repository";

export default async (_: Request, response: Response) => {
  response
    .status(200)
    .send(await new NursesRepository().getHiringAvailability())
};
