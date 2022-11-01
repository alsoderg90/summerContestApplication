import {
  LOGIN_ACTION,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_ACTION
} from './constants'

const initialState = {
  user: undefined,
  error: undefined,
  loading: false
}

/* eslint-disable indent */
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      state = {
        ...state,
        error: undefined,
        loading: true
      }
      break
    case LOGIN_ERROR: {
      const { data, status } = action.payload.response
      state = {
        ...state,
        error: { message: data, status },
        loading: false
      }
      break
    }
    case LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload,
        loading: false,
        error: undefined
      }
      break
    case LOGOUT_ACTION:
      state = {
        ...state,
        user: undefined,
        loading: false,
        error: undefined
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default loginReducer
