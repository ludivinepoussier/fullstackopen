import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote) && props.setNotification({message: `You voted "${anecdote.content}"`}, 5)
  }

  return (
    <>
      {props.anecdotes
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

const mapStateToProps = (state) => {
  const filter = state.filter
  const anecdotes = state.anecdotes
  if (filter === '') {
    return {
      anecdotes
    }
  }
  return { anecdotes: anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())) }

}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
