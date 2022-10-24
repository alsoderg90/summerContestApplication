import { createSelector } from '@reduxjs/toolkit'

const selectDomain = (state) => state.memberReducer

export const selectMembers = createSelector(
  [selectDomain],
  (members) => members.members
)
