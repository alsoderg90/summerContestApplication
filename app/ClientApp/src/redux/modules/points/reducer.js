import {
  GET_POINTS_ACTION,
  GET_POINTS_ERROR,
  GET_POINTS_SUCCESS,
  SET_POINTS_SUCCESS
} from './constants'

const initialState = {
  points: undefined,
  loadingPoints: false,
  error: {
    message: undefined
  }
}

/* eslint-disable indent */
const pointReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POINTS_ACTION:
      state = { ...state, loadingPoints: true }
      break
    case GET_POINTS_ERROR:
      state = { ...state, error: { message: 'Error' }, loadingPoints: false }
      break
    case GET_POINTS_SUCCESS:
      state = { ...state, points: action.payload, loadingPoints: false }
      break
    case SET_POINTS_SUCCESS:
      state = {
        ...state,
        points: !state.points
          ? action.payload
          : state.points.concat(action.payload)
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default pointReducer
