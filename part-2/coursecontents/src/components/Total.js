import React from 'react'

const Total = ({ course }) => {
    const reducer = (acc, cur) => acc + cur
    const arrExercises = course.parts.map(num => num.exercises)
    const sum = arrExercises.reduce(reducer)

    return (
        <p>Total of {sum} exercises.</p>
    )
}

export default Total
