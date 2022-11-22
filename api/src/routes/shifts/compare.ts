import moment from 'moment';
import { ShiftsRepository } from './utils/repository';
import { Request, Response } from "express";
import { isNil } from 'lodash'
import { Shift } from './models/types';

const getOverlapMinutes = (shifts: Shift[]): number => {
  const difference = moment(shifts[0].endAt).diff(shifts[1].startAt, 'minutes')

  if (difference < 0) {
    return 0
  }

  return difference
}

export default async (request: Request, response: Response) => {
  try {
    if (isNil(request.query.shifts) || !Array.isArray(request.query.shifts)) {
      response.status(400).send('INVALID_COMPARISON_PARAMS')
      return
    }

    if (request.query.shifts.length !== 2) {
      response.status(400).send('INVALID_SHIFTS_LENGTH')
      return
    }

    const shifts = await new ShiftsRepository().find(request.query.shifts.map(value => parseInt(value)))

    if (shifts.length !== 2) {
      response.status(404).send('SHIFT_NOT_FOUND');
      return
    }

    const overlapMinutes = getOverlapMinutes(shifts)

    const maximumOverlapThreshold = shifts[0].facility.id === shifts[1].facility.id ? 30 : 0

    response
      .status(200)
      .send({
        shiftA: shifts[0],
        shiftB: shifts[1],
        overlapMinutes,
        maximumOverlapThreshold,
        exceedsOverlapThreshold: overlapMinutes > maximumOverlapThreshold,
      })
  } catch (e) {
    console.error(e)
    response.status(400).send('WRONG_REQUEST')
  }
};
