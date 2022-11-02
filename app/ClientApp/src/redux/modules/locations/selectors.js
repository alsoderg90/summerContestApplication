import { createSelector } from '@reduxjs/toolkit'

const selectDomain = (state) => state.locationReducer

export const selectLocations = createSelector(
  [selectDomain],
  (locations) => locations.locations
)

export const selectNewLocation = createSelector(
  [selectDomain],
  (locations) => locations.newLocation
)

export const selectSelectedLocation = createSelector(
  [selectDomain],
  (locations) => locations.selectedLocation
)

export const selectLocationError = createSelector(
  [selectDomain],
  (location) => location.error
)
