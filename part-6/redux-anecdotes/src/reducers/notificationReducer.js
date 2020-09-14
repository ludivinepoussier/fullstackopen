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

export const notificationMessage = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { message }
  }
}

export const removeMessage = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer
