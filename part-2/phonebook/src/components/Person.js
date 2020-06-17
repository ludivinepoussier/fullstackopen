import React from 'react'

const Person = ({ data }) => {
    return (
        <li>{`${data.name}: ${data.num}`}</li>
    )
}

export default Person
