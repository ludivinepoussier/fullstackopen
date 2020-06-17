import React, { useState } from 'react'
import Person from './components/Person'

const App = (props) => {
    const [persons, setPersons] = useState(props.persons)
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')


    const addPerson = (event) => {
        event.preventDefault()

        const personObject = {
            name: newName,
            num: newNum,
            id: persons.length + 1,
        }

        if (persons.filter(person => person.name === newName).length > 0) {
            window.alert(`${newName} is already added to phonebook`)
            setNewName('')
            setNewNum('')
        } else {
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNum('')
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumChange = (event) => {
        setNewNum(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: 
                    <input 
                        value={newName}
                        onChange={handleNameChange}/>
                </div>
                <div>
                    number: 
                    <input 
                        value={newNum}
                        onChange={handleNumChange}/>
                </div>
                <div>debug: {newName}</div>
                <div>debug: {newNum}</div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((data) =>
                    <Person key={data.id} data={data} />
                )}
            </ul>
        </div>
    )
}

export default App
