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
  return {
    type: CREATE_LOCATION_ACTION,
    newLocation
  }
}

export const createLocationSuccess = (location) => {
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

export const deleteLocation = (id) => {
  return {
    type: DELETE_LOCATION_ACTION,
    id
  }
}

export const deleteLocationSuccess = (deletedLocation) => {
  return {
    type: DELETE_LOCATION_SUCCESS,
    payload: deletedLocation
  }
}

export const deleteLocationError = (error) => {
  return {
    type: DELETE_LOCATION_ERROR,
    payload: error
  }
}

export const deleteMemberPointsSuccess = (error) => {
  return {
    type: DELETE_MEMBER_POINTS_SUCCESS,
    payload: error
  }
}

export const editLocation = (id, editedLocation) => {
  return {
    type: EDIT_LOCATION_ACTION,
    id,
    editedLocation
  }
}

export const editLocationSuccess = (editedLocation) => {
  return {
    type: EDIT_LOCATION_SUCCESS,
    payload: editedLocation
  }
}

export const editLocationError = (error) => {
  return {
    type: EDIT_LOCATION_ERROR,
    payload: error
  }
}

export const editMemberPointsSuccess = (editedMember) => {
  return {
    type: EDIT_MEMBER_POINTS_SUCCESS,
    payload: editedMember
  }
}
