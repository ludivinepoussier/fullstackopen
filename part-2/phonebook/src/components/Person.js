import React from 'react'

const Person = ({ name, num }) => {
    return (
        <li>{`${name.name} ${num.num}`}</li>
    )
}

export default Person
