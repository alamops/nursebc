import { FacilityTransfomer } from './../../facilities/utils/transformer';
import { RawShift, Shift } from "../models/types";

export class ShiftTransformer {
  static transform(data: RawShift): Shift {
    return {
      id: data.shift_id,
      startAt: new Date(data.start_time),
      endAt: new Date(data.end_time),
      facility: FacilityTransfomer.transform(data)
    }
  }
}
