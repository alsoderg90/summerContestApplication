import { createSelector } from '@reduxjs/toolkit'

const selectDomain = (state) => state.notificationReducer

export const selectNotification = createSelector(
  [selectDomain],
  (locations) => locations.notifications
)
