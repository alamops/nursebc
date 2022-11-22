export interface RawNurse {
  nurse_id: number
  nurse_name: string
  nurse_type: string
}

export interface RawNurseHiringAvailability extends RawNurse {
  hiring_availability: number
}

export interface Nurse {
  id: number
  name: string
  type: string
}

export interface NurseHiringAvailability extends Nurse {
  hiringAvailability: number
}
