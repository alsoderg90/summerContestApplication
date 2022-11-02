import { createSelector } from '@reduxjs/toolkit'

const selectDomain = (state) => state.teamReducer

export const selectTeams = createSelector(
  [selectDomain],
  (teams) => teams.teams
)

export const selectTeamsError = createSelector(
  [selectDomain],
  (teams) => teams.error
)
