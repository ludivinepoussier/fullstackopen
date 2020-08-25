import React from 'react'

const NotificationError = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message) {
    return (
      <div className='error'>
        {message}
      </div>
    )  
  }
}

export default NotificationError
