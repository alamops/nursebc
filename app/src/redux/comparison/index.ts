import initialState from './state'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Shift } from '../../../../api/src/routes/shifts/models/types';
import { compareShifts } from './thunks';

export const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    toggleShift: (state, action: PayloadAction<Shift>) => {
      const shiftIndex = state.shifts.findIndex(item => item.id === action.payload.id)
      
      if (shiftIndex >= 0) {
        state.shifts.splice(shiftIndex, 1)
        state.error = null
        state.result = undefined
        return
      }

      if (state.shifts.length >= 2) {
        return
      }

      state.shifts.push(action.payload)
      state.error = null
      state.result = undefined
    }
  },
  extraReducers: (builder) => {
    builder.addCase(compareShifts.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.result = action.payload
    })

    builder.addCase(compareShifts.pending, (state) => {
      state.loading = true
      state.error = null
      state.result = undefined
    })

    builder.addCase(compareShifts.rejected, (state, action) => {
      state.loading = false
      state.result = undefined
      state.error = action.error.message ?? 'Oops! Something wrong has happened.'
    })
  }
})

export const {
  toggleShift
} = comparisonSlice.actions

export default comparisonSlice.reducer
