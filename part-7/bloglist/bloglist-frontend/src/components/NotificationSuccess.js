import React from 'react'

const NotificationSuccess = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message) {
    return (
      <div className='success'>
        {message}
      </div>
    )
  }
}

export default NotificationSuccess
