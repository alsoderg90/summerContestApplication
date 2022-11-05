import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectNotification } from 'redux/helpers/notifications/selectors'
import 'react-notifications/lib/notifications.css'
import { notificationTypes } from './notificationTypes'
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications'
import { clearNotification } from 'redux/helpers/notifications/actions'

const Notifications = () => {
  const notification = useSelector((state) =>
    selectNotification(state)
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (notification) {
      const { type, message } = notification
      switch (notification.type) {
        case 'edited':
          NotificationManager.info(
            `${message} ${notificationTypes[type]}`,
            'Edited!',
            2000
          )
          break
        case 'created':
          NotificationManager.success(
            `${message} ${notificationTypes[type]}`,
            'Success!',
            2000
          )
          break
        case 'deleted':
          NotificationManager.warning(
            undefined,
            'Deleted successfully!',
            2000
          )
          break
      }
    }
    return () => {
      dispatch(clearNotification())
    }
  }, [notification])

  return <NotificationContainer />
}
export default Notifications
