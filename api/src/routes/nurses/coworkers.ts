import { Request, Response } from "express";
import { isNil } from "lodash";
import { NursesRepository } from "./utils/repository";

export default async (request: Request, response: Response) => {
  try {
    if (isNil(request.query.nurseId) || Array.isArray(request.query.nurseId) || request.query.nurseId === '') {
      response.status(400).send('INVALID_NURSE_PARAM')
      return
    }

    const nurseId = parseInt(request.query.nurseId as string);
  
    response
      .status(200)
      .send(await new NursesRepository().getCoworkers(nurseId))
  } catch (e) {
    console.error(e)
    response.status(400).send('WRONG_REQUEST')
  }
};
