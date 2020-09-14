import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { notificationMessage, removeMessage } from './../reducers/notificationReducer'


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
    dispatch(voteAnecdote(id))

    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id)
    dispatch(notificationMessage({ message: `You voted "${votedAnecdote.content}"` }))

    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
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
