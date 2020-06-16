import React, { useState } from 'react'
import Name from './components/Name'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')
    const [showAll, setShowAll] = useState(true)

    const addName = (event) => {
        event.preventDefault()

        const nameObject = {
            content: newName,
            id: persons.length + 1,
        }

        setPersons(persons.concat(nameObject))
        setNewName('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const namesToShow = showAll
        ? persons
        : persons.filter(name => name.important)

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name: 
                    <input 
                        value={newName}
                        onChange={handleNameChange}/>
                </div>
                <div>debug: {newName}</div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {namesToShow.map(name =>
                    <Name key={name.id} name={name} />
                )}
            </ul>
        </div>
    )
}

export default App
