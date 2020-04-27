import React from 'react';
import ReactDOM from 'react-dom';

const Header = props => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = props => {
  return (
    <>
      <h2>{props.part}</h2>
      <p>This section contains {props.exercises} exercises.</p>
    </>
  )
}

const Content = props => {
  return (
    <div>
      <Part part={props.course.parts[0].name} exercises={props.course.parts[0].exercises} />
      <Part part={props.course.parts[1].name} exercises={props.course.parts[1].exercises} />
      <Part part={props.course.parts[2].name} exercises={props.course.parts[2].exercises} />
    </div>
  )
}

const Total = props => {
  return (
    <h3>The total number of exercises is {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}. </h3>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
