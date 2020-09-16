const initialState = { message: '' }

const notificationReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return action.data.message
    }
    case 'REMOVE_NOTIFICATION': {
      return initialState
    }
    default:
      return state
  }
  
}

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        message,
        time: setTimeout(() => {
          dispatch(removeNotification(''))
        }, time * 1000)
      }
    })
  } 
}

const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer
