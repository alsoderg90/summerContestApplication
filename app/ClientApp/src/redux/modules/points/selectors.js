import { createSelector } from '@reduxjs/toolkit'

const selectDomain = (state) => state.pointReducer

export const selectPoints = createSelector(
  [selectDomain],
  (points) => points.points
)
