import {
  GET_LOCATIONS_ACTION,
  GET_LOCATIONS_ERROR,
  GET_LOCATIONS_SUCCESS,
  CREATE_LOCATION_ACTION,
  CREATE_LOCATION_ERROR,
  CREATE_LOCATION_SUCCESS,
  SET_NEW_LOCATION_ACTION,
  SET_SELECTED_LOCATION_ACTION
} from './constants'

export const getLocations = () => {
  return {
    type: GET_LOCATIONS_ACTION
  }
}

export const getLocationsSuccess = (locations) => {
  return {
    type: GET_LOCATIONS_SUCCESS,
    payload: locations
  }
}

export const getLocationsError = (error) => {
  return {
    type: GET_LOCATIONS_ERROR,
    payload: error
  }
}

export const createLocation = (newLocation) => {
  console.log(newLocation)
  return {
    type: CREATE_LOCATION_ACTION,
    newLocation
  }
}

export const createLocationSuccess = (location) => {
  console.log('moi')
  return {
    type: CREATE_LOCATION_SUCCESS,
    payload: location
  }
}

export const createLocationError = (error) => {
  return {
    type: CREATE_LOCATION_ERROR,
    payload: error
  }
}

export const setNewLocation = (newLocation) => {
  return {
    type: SET_NEW_LOCATION_ACTION,
    newLocation
  }
}

export const setSelectedLocation = (selectedLocation) => {
  return {
    type: SET_SELECTED_LOCATION_ACTION,
    selectedLocation
  }
}
