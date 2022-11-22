import { Facility, RawFacility, FacilityAvailability, RawFacilityAvailability } from "../models/types";

export class FacilityTransfomer {
  static transform(data: RawFacility): Facility {
    return {
      id: data.facility_id,
      name: data.facility_name
    }
  }

  static transformAvailability(data: RawFacilityAvailability): FacilityAvailability {
    return {
      id: data.facility_id,
      name: data.facility_name,
      nurseTypeNeeded: data.nurse_type_needed,
      totalNeeded: data.total_number_nurses_needed,
      totalHired: data.total_hired,
      remainingSpots: data.remaining_spots,
    }
  }
}
