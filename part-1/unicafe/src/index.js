import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistic = ({ value, text }) => (
      <tr>
        <td>{text}</td> 
        <td>{value}</td>
      </tr>
)

const Statistics = ({ good, bad, neutral }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = `${(good / total) * 100} %`

  if (good !== 0 || bad !== 0 || neutral !== 0) {
    return (
      <table>
        <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={total} />
        <Statistic text="average" value={average}/>
        <Statistic text="positive" value={positive} />
        </tbody>
      </table>
    )
  }
  return `No feedback given.`
}

const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodButton = () => {
    setGood(good + 1)
  }

  const handleNeutralButton = () => {
    setNeutral(neutral + 1)
  }

  const handleBadButton = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <p>
        <Button onClick={handleGoodButton} text='good' />
        <Button onClick={handleNeutralButton} text='neutral' />
        <Button onClick={handleBadButton} text='bad' />
      </p>
      <h2>Statistics</h2>
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
