import {
  GET_MEMBERS_ACTION,
  GET_MEMBERS_ERROR,
  GET_MEMBERS_SUCCESS,
  CREATE_MEMBER_ACTION,
  CREATE_MEMBER_ERROR,
  CREATE_MEMBER_SUCCESS
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
