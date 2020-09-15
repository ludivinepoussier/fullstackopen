const anecdoteReducer = (state = [], action) => {
  console.log("state now: ", state)
  console.log("action", action)
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const votedAnecdote = state.find(it => it.id === id)
      const updatedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      )
    default:
      return state
  }
}

export const createAnecdote = data => {
  return {
    type: "NEW_ANECDOTE",
    data
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export const voteAnecdote = id => {
  return {
    type: "VOTE",
    data: id
  }
}

export default anecdoteReducer
