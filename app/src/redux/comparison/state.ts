import { Shift, ShiftsComparisonResult } from "../../../../api/src/routes/shifts/models/types";

export interface ComparisonState {
  loading: boolean
  shifts: Shift[]
  result?: ShiftsComparisonResult
  error: string | null
}

export default {
  loading: false,
  shifts: [],
  result: undefined,
  error: null
} as ComparisonState
