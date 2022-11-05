const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'
export const createNotification = ({ type, message }) => {
  return {
    type: CREATE_NOTIFICATION,
    payload: { message, type }
  }
}

export const clearNotification = () => {
  return {
    type: CLEAR_NOTIFICATION
  }
}
