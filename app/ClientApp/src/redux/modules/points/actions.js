import {
  GET_POINTS_ACTION,
  GET_POINTS_ERROR,
  GET_POINTS_SUCCESS
} from './constants'

export const getPoints = () => {
  return {
    type: GET_POINTS_ACTION
  }
}

export const getPointsSuccess = (teams) => {
  return {
    type: GET_POINTS_SUCCESS,
    payload: teams
  }
}

export const getPointsError = (error) => {
  return {
    type: GET_POINTS_ERROR,
    payload: error
  }
}
