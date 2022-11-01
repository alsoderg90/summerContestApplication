import {
  GET_LOCATIONS_ACTION,
  GET_LOCATIONS_ERROR,
  GET_LOCATIONS_SUCCESS,
  CREATE_LOCATION_ACTION,
  CREATE_LOCATION_ERROR,
  CREATE_LOCATION_SUCCESS,
  SET_NEW_LOCATION_ACTION,
  SET_SELECTED_LOCATION_ACTION,
  DELETE_LOCATION_ACTION,
  DELETE_LOCATION_SUCCESS,
  DELETE_LOCATION_ERROR
} from './constants'

const initialState = {
  locations: undefined,
  loadingLocations: false,
  newLocation: undefined,
  selectedLocation: undefined,
  error: {
    message: ''
  }
}

/* eslint-disable indent */
const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LOCATION_ACTION:
    case DELETE_LOCATION_ACTION:
    case GET_LOCATIONS_ACTION:
      state = { ...state, loadingLocations: true }
      break
    case CREATE_LOCATION_ERROR:
    case DELETE_LOCATION_ERROR:
    case GET_LOCATIONS_ERROR:
      state = { ...state, error: { message: 'Error' }, loadingLocations: false }
      break
    case GET_LOCATIONS_SUCCESS:
      state = { ...state, locations: action.payload, loadingLocations: false }
      break
    case CREATE_LOCATION_SUCCESS:
      state = {
        ...state,
        locations: state.locations.concat(action.payload),
        loadingLocations: false
      }
      break
    case DELETE_LOCATION_SUCCESS:
      state = {
        ...state,
        locations: state.locations.filter(
          (location) => location.id !== action.payload
        ),
        selectedLocation: undefined,
        loadingLocations: false
      }
      break
    case SET_NEW_LOCATION_ACTION:
      state = {
        ...state,
        newLocation: action.newLocation,
        selectedLocation: undefined
      }
      break
    case SET_SELECTED_LOCATION_ACTION:
      state = {
        ...state,
        selectedLocation: action.selectedLocation,
        newLocation: undefined
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default locationReducer
