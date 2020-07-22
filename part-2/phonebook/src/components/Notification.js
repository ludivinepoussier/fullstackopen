import React from 'react'

const Notification = ({ message, success }) => {
    if (message === null) {
        return null
    }

    const classNameMsg = success ? "msgSuccess" : "msgError"
    return (
        <div className={classNameMsg} >
            {message}
        </div>
    )
}

export default Notification
