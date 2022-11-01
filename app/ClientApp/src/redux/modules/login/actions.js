import {
  LOGIN_ACTION,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_ACTION
} from './constants'

export const login = (formData) => {
  return {
    type: LOGIN_ACTION,
    payload: formData
  }
}

export const loginSuccess = (token) => {
  return {
    type: LOGIN_SUCCESS,
    payload: token
  }
}

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error
  }
}

export const logOut = () => {
  return {
    type: LOGOUT_ACTION
  }
}
