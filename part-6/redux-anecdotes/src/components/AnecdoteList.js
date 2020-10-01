import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote)) && dispatch(setNotification(`You voted "${anecdote.content}"`, 5))
  }

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>has {anecdote.votes} votes &nbsp; <button onClick={() => vote(anecdote)}>vote</button></div>
          </div>
        )}
    </>
  )
}

export default AnecdoteList
