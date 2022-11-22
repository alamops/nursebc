import { Nurse, NurseHiringAvailability, RawNurse, RawNurseHiringAvailability } from "../models/types"

export class NurseTransfomer {
  static transform(data: RawNurse): Nurse {
    return {
      id: data.nurse_id,
      name: data.nurse_name,
      type: data.nurse_type
    }
  }

  static transformHiringAvailability(data: RawNurseHiringAvailability): NurseHiringAvailability {
    return {
      id: data.nurse_id,
      name: data.nurse_name,
      type: data.nurse_type,
      hiringAvailability: data.hiring_availability
    }
  }
}
