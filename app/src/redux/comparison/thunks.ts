import { RootState, AppDispatch } from './../index';
import { ShiftsComparisonResult } from './../../../../api/src/routes/shifts/models/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const compareShifts = createAsyncThunk<
  ShiftsComparisonResult,
  undefined,
  {
    dispatch: AppDispatch,
    state: RootState
  }
>('comparison/compareShifts', async (_, thunkAPI): Promise<ShiftsComparisonResult> => {
  const state = thunkAPI.getState() as RootState
  
  const queryParams = new URLSearchParams()
  state.comparison.shifts.forEach(shift => queryParams.append('shifts', shift.id.toString()))
  
  const response = await fetch(`${process.env.REACT_APP_API_URL}/shifts/compare?${queryParams}`)
  return response.json()
})
