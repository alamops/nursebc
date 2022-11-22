import { RootState } from '../index';

export const getSelectedShifts = (state: RootState) => state.comparison.shifts

export const getShiftsComparisonResult = (state: RootState) => state.comparison.result

export const getShiftsComparisonError = (state: RootState) => state.comparison.error

export const getIsComparing = (state: RootState) => state.comparison.loading
