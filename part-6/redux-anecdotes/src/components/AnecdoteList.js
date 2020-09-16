import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') return state.anecdotes

    return state.anecdotes
      .filter(anecdote => anecdote.content.toLowerCase()
        .includes(state.filter.toLowerCase())
      )
  })

  const dispatch = useDispatch()

  const vote = id => {
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id)
    dispatch(voteAnecdote(votedAnecdote))

    dispatch(setNotification({ message: `You voted "${votedAnecdote.content}"` }, 5))
  }

  return (
    anecdotes
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} &nbsp;
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )
  )
}

export default AnecdoteList
