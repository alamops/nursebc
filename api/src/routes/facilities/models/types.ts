export interface RawFacility {
  facility_id: number
  facility_name: string
}

export interface RawFacilityAvailability extends RawFacility {
  nurse_type_needed: string
  total_number_nurses_needed: number
  total_hired: string
  remaining_spots: string
}

export interface Facility {
  id: number
  name: string
}

export interface FacilityAvailability extends Facility {
  nurseTypeNeeded: string
  totalNeeded: number
  totalHired: number
  remainingSpots: number
}
