import {
  GET_MEMBERS_ACTION,
  GET_MEMBERS_ERROR,
  GET_MEMBERS_SUCCESS,
  CREATE_MEMBER_ACTION,
  CREATE_MEMBER_ERROR,
  CREATE_MEMBER_SUCCESS,
  DELETE_MEMBER_ACTION,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_ERROR,
  EDIT_MEMBER_ACTION,
  EDIT_MEMBER_ERROR,
  EDIT_MEMBER_SUCCESS,
  EDIT_MEMBER_LOCATION_SUCCESS,
  DELETE_MEMBER_LOCATION_SUCCESS,
  CREATE_MEMBER_LOCATION_SUCCESS
} from './constants'

const initialState = {
  members: undefined,
  loadingMembers: false,
  error: undefined
}

/* eslint-disable indent */
const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_MEMBER_ACTION:
    case CREATE_MEMBER_ACTION:
    case EDIT_MEMBER_ACTION:
    case GET_MEMBERS_ACTION:
      state = {
        ...state,
        loadingMembers: true,
        error: undefined
      }
      break
    case DELETE_MEMBER_ERROR:
    case CREATE_MEMBER_ERROR:
    case EDIT_MEMBER_ERROR:
    case GET_MEMBERS_ERROR: {
      const { data, status } = action.payload.response
      state = {
        ...state,
        error: { message: data, status },
        loadingMembers: false
      }
      break
    }
    case GET_MEMBERS_SUCCESS:
      state = {
        ...state,
        members: action.payload,
        loadingMembers: false,
        error: undefined
      }
      break
    case CREATE_MEMBER_SUCCESS: {
      const member = action.payload
      state = {
        ...state,
        members: state.members.concat({ ...member, points: [] }),
        loadingMembers: false,
        error: undefined
      }
      break
    }
    case CREATE_MEMBER_LOCATION_SUCCESS:
      state = {
        ...state,
        members: state.members.map((member) => {
          const points = action.payload.points.find(
            (point) => point.memberId === member.id
          )
          return {
            ...member,
            points: points
              ? member.points.concat(points)
              : member.points
          }
        })
      }
      break
    case EDIT_MEMBER_SUCCESS:
      state = {
        ...state,
        members: state.members.map((member) => {
          return member.id === action.payload.id
            ? action.payload
            : member
        })
      }
      break
    case EDIT_MEMBER_LOCATION_SUCCESS: {
      const members = state.members.forEach((member) => {
        return member.points.map((pointA) => {
          return action.payload.points.map((pointB) => {
            return pointB.memberId === pointA.memberId
              ? pointB
              : pointA
          })
        })
      })
      state = {
        ...state,
        members: members
      }
      break
    }
    case DELETE_MEMBER_SUCCESS:
      state = {
        ...state,
        members: state.members.filter(
          (member) => member.id !== action.payload
        ),
        loadingMembers: false,
        error: undefined
      }
      break
    case DELETE_MEMBER_LOCATION_SUCCESS:
      state = { ...state }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default memberReducer
