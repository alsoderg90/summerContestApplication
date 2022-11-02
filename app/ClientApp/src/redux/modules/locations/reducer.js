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
  DELETE_LOCATION_ERROR,
  DELETE_MEMBER_POINTS_SUCCESS,
  EDIT_LOCATION_ACTION,
  EDIT_LOCATION_SUCCESS,
  EDIT_LOCATION_ERROR,
  EDIT_MEMBER_POINTS_SUCCESS
} from './constants'

const initialState = {
  locations: undefined,
  loadingLocations: false,
  newLocation: undefined,
  selectedLocation: undefined,
  error: undefined
}

/* eslint-disable indent */
const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LOCATION_ACTION:
    case DELETE_LOCATION_ACTION:
    case EDIT_LOCATION_ACTION:
    case GET_LOCATIONS_ACTION:
      state = { ...state, loadingLocations: true }
      break
    case CREATE_LOCATION_ERROR:
    case DELETE_LOCATION_ERROR:
    case EDIT_LOCATION_ERROR:
    case GET_LOCATIONS_ERROR: {
      const { data, status } = action.payload.response
      state = {
        ...state,
        error: { message: data, status },
        loadingMembers: false
      }
      break
    }
    case GET_LOCATIONS_SUCCESS:
      state = {
        ...state,
        locations: action.payload,
        loadingLocations: false
      }
      break
    case CREATE_LOCATION_SUCCESS:
      state = {
        ...state,
        locations: state.locations.concat(action.payload),
        loadingLocations: false,
        newLocation: action.payload
      }
      break
    case EDIT_LOCATION_SUCCESS:
      state = {
        ...state,
        selectedLocation: action.payload
      }
      break
    case EDIT_MEMBER_POINTS_SUCCESS:
      state = {
        ...state,
        locations: state.locations.map((location) => {
          const points = location.points.map((point) =>
            point.memberId === action.payload.id
              ? { ...point, member: action.payload }
              : point
          )
          return { ...location, points }
        })
      }
      break
    case DELETE_LOCATION_SUCCESS:
      state = {
        ...state,
        locations: state.locations.filter(
          (location) => location.id == action.payload
        ),
        selectedLocation: undefined,
        loadingLocations: false
      }
      break
    case DELETE_MEMBER_POINTS_SUCCESS: {
      const locations = state.locations.forEach((location) => {
        const points = location.points.filter(
          (point) => point.memberId == action.payload
        )
        return { ...location, points }
      })
      state = { ...state, locations, selectedLocation: undefined }
      break
    }
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
