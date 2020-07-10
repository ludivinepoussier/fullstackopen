import React from 'react'

const Person = ({ data, removePerson }) => {
    return (
        <li>
            {`${data.name}: ${data.num}`}
            &nbsp;
            <button onClick={() => removePerson(data.id)}>delete</button>
        </li>
    )
}

export default Person
