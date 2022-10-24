import {
  GET_MEMBERS_ACTION,
  GET_MEMBERS_ERROR,
  GET_MEMBERS_SUCCESS,
  CREATE_MEMBER_ACTION,
  CREATE_MEMBER_ERROR,
  CREATE_MEMBER_SUCCESS
} from './constants'

const initialState = {
  members: undefined,
  loadingMembers: false,
  error: {
    message: ''
  }
}

/* eslint-disable indent */
const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MEMBER_ACTION:
    case GET_MEMBERS_ACTION:
      state = { ...state, loadingMembers: true }
      break
    case CREATE_MEMBER_ERROR:
    case GET_MEMBERS_ERROR:
      state = { ...state, error: { message: 'Error' }, loadingMembers: false }
      break
    case GET_MEMBERS_SUCCESS:
      state = { ...state, members: action.payload, loadingMembers: false }
      break
    case CREATE_MEMBER_SUCCESS:
      state = {
        ...state,
        members: state.members.concat(action.payload),
        loadingMembers: false
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default memberReducer
