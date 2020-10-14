import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification.message) {
    return null
  }

  const style = {
    padding: 10,
    margin: 20,
    color: notification.success ? 'green' : 'red',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  }

  return <div style={style}>
    {notification.message}
  </div>
}

export default Notification
