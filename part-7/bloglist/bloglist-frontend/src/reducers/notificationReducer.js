const initialState = {
  message: '',
  type: 'success',
  pendingTimeoutHandler: null
}

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

export const setNotification = (message, type, time=5) => {

  return async (dispatch) => {

    const result = {
      message,
      type,
      pendingTimeoutHandler: setTimeout(() => { dispatch(removeNotification()) }, time * 1000),
    }

    dispatch({
      type: "SET_NOTIFICATION",
      data: result
    })
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer
