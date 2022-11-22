import { ShiftsRepository } from './utils/repository';
import { Request, Response } from "express";

export default async (_: Request, response: Response) => {
  const shiftsRepository: ShiftsRepository = new ShiftsRepository()
  
  response
    .status(200)
    .send(await shiftsRepository.findAll())
};
