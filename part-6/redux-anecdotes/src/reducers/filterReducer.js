const initialState = ''

const filterReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'SET_FILTER': {
      return action.data.filter
    }
    default:
      return state
  }

}

export const filterAnecdote = (filter) => {
  return {
    type: 'SET_FILTER',
    data: { filter }
  }
}

export default filterReducer
