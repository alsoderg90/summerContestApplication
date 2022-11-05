const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'

const initialState = {
  notifications: undefined
}

/* eslint-disable indent */
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTIFICATION: {
      const { type, message } = action.payload
      state = { notifications: { type, message } }
      break
    }
    case CLEAR_NOTIFICATION:
      state = { notifications: undefined }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default notificationReducer
