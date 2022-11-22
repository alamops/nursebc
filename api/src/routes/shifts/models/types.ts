import { RawFacility, Facility } from './../../facilities/models/types';

export interface RawShift extends RawFacility {
  shift_id: number;
  start_time: string;
  end_time: string;
}

export interface Shift {
  id: number;
  startAt: Date;
  endAt: Date;
  facility: Facility
}

export interface ShiftsComparisonRequest {
  shifts: number[]
}
