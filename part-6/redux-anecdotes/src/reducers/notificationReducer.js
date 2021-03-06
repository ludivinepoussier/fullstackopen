const initialState = { message: '' }

const notificationReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'SET_NOTIFICATION': {
      if (state.pendingTimeoutHandler) {
        clearTimeout(state.pendingTimeoutHandler)
        state.pendingTimeoutHandler = null
      }
      return action.data
    }
    case 'REMOVE_NOTIFICATION': 
      return initialState
    default:
      return state
  }
}

export const setNotification = (message, time) => {

  return async (dispatch) => {

    const result = {
      message,
      pendingTimeoutHandler: setTimeout(() => { dispatch(removeNotification()) }, time * 1000),
    }

    dispatch({
      type: "SET_NOTIFICATION",
      data: result
    })
  } 
}

const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer
