import {
  GET_MEMBERS_ACTION,
  GET_MEMBERS_ERROR,
  GET_MEMBERS_SUCCESS,
  CREATE_MEMBER_ACTION,
  CREATE_MEMBER_ERROR,
  CREATE_MEMBER_SUCCESS,
  CREATE_MEMBER_LOCATION_SUCCESS,
  DELETE_MEMBER_ACTION,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_ERROR,
  EDIT_MEMBER_ACTION,
  EDIT_MEMBER_ERROR,
  EDIT_MEMBER_SUCCESS,
  EDIT_MEMBER_LOCATION_SUCCESS,
  DELETE_MEMBER_LOCATION_SUCCESS
} from './constants'

export const getMembers = () => {
  return {
    type: GET_MEMBERS_ACTION
  }
}

export const getMembersSuccess = (members) => {
  return {
    type: GET_MEMBERS_SUCCESS,
    payload: members
  }
}

export const getMembersError = (error) => {
  return {
    type: GET_MEMBERS_ERROR,
    payload: error
  }
}

export const createMember = (newMember) => {
  return {
    type: CREATE_MEMBER_ACTION,
    newMember
  }
}

export const createMemberLocationSuccess = (newLocation) => {
  return {
    type: CREATE_MEMBER_LOCATION_SUCCESS,
    payload: newLocation
  }
}

export const createMemberSuccess = (member) => {
  return {
    type: CREATE_MEMBER_SUCCESS,
    payload: member
  }
}

export const createMemberError = (error) => {
  return {
    type: CREATE_MEMBER_ERROR,
    payload: error
  }
}

export const deleteMember = (id) => {
  return {
    type: DELETE_MEMBER_ACTION,
    id
  }
}

export const deleteMemberSuccess = (deletedMember) => {
  return {
    type: DELETE_MEMBER_SUCCESS,
    payload: deletedMember
  }
}

export const deleteMemberError = (error) => {
  return {
    type: DELETE_MEMBER_ERROR,
    payload: error
  }
}

export const editMember = (id, editedMember) => {
  return {
    type: EDIT_MEMBER_ACTION,
    id,
    editedMember
  }
}

export const editMemberSuccess = (editedMember) => {
  return {
    type: EDIT_MEMBER_SUCCESS,
    payload: editedMember
  }
}

export const editMemberError = (error) => {
  return {
    type: EDIT_MEMBER_ERROR,
    payload: error
  }
}

export const editMemberLocationSuccess = (editedLocation) => {
  return {
    type: EDIT_MEMBER_LOCATION_SUCCESS,
    payload: editedLocation
  }
}

export const deleteMemberLocationSuccess = (deletedLocation) => {
  return {
    type: DELETE_MEMBER_LOCATION_SUCCESS,
    payload: deletedLocation
  }
}
