import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({ course }) => {
  return (
    <>
    < Header course={course} />
    < Content course={course} />
    < Total course={course} />
    </>
  )
}

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => < Part key={part.id} part={part} />)}
    </div>
  )
}

const Total = ({ course }) => {
  const reducer = (acc, cur) => acc + cur
  const arrExercises = course.parts.map(num => num.exercises)
  const sum = arrExercises.reduce(reducer)

  return (
    <p>Total of {sum} exercises.</p>
  )
}

const App = () => {

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web Development curriculum</h1>
      <div>
        {courses.map(course => <Course key={course.id} course={course} />)}
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
