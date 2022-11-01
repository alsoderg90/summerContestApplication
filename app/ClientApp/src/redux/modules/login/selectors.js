import { createSelector } from '@reduxjs/toolkit'

const selectDomain = (state) => state.loginReducer

export const selectUser = createSelector([selectDomain], (state) => state.user)
