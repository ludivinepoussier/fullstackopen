import React from 'react'

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

export default Course
