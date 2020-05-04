import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
  {text}
  </button>
)
  
const Vote = ({text, value}) => (
  <p>{text} {value}</p>
)
    
const Votes = ({vote}) => {
  return (
    <div>
    <Vote text="Numbers of votes for this anecdote: " value={vote} />
    </div>
  )
}
      
const AnecdoteSingle = ({ text }) => <p>"{text}"</p>

const AnecdoteMulti = ({ arrText }) => arrText.map(text => < AnecdoteSingle key={text.toString()} text={text} />)
      
const MostVotes = ({vote}) => {
  const mostVote = Math.max(...vote)
  if (mostVote === 0) return  <p>Please vote for your favorite anecdote.</p>
  
  const mostIndexArr = vote
  .map((val, idx) => ({ val, idx }))
  .filter( ({val}) => val === mostVote)
  .map( ({idx}) => idx )
  
  const response = mostIndexArr.map(mostIndex => { const batata = mostIndex; return anecdotes[batata]})
  
  return < AnecdoteMulti arrText={response}/>
}

      
const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(6).fill(0))
  
  const random = (arr) => {
    let next
    do {
      next = Math.floor(Math.random() * Math.floor(arr.length))
    } while (next === selected)   
    return next
  }
  
  const handleClickNext = () => {
    setSelected(random(anecdotes))
  }
  
  const handleClickVote = () => {
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)
  }
  
  return (
    <div>
    <h1>The world of software engineering anecdotes</h1>
    <h2>Our selection of anecdotes:</h2>
    "{anecdotes[selected]}"
    <Votes vote={vote[selected]} />
    <p>
    <Button onClick={handleClickNext} text='next one' />
    <Button onClick={handleClickVote} text='vote' />
    </p>
    <h2>Anecdote(s) with most votes:</h2>
    <MostVotes vote={vote} anecdotes={anecdotes} />
    </div>
  )
}
        
const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
        
ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
