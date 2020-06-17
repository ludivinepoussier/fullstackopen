import React, { useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'

const App = (props) => {
    const [persons, setPersons] = useState(props.persons)
    const [searchTerm, setSearchTerm] = useState('');
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')

    const addPerson = (event) => {
        event.preventDefault()

        const personObject = {
            name: newName,
            num: newNum,
            id: persons.length + 1,
        }

        if (persons.some(it => it.name === newName)) {
            window.alert(`${newName} is already added to phonebook`)
            setNewName('')
            setNewNum('')
        } else {
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNum('')
        }
    }

    const handleFilterChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumChange = (event) => {
        setNewNum(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <input
                value={searchTerm}
                onChange={handleFilterChange}
            />

            <h3>Add a new contact</h3>

            <PersonForm 
                addPerson={addPerson} 
                newName={newName}
                handleNameChange={handleNameChange}
                newNum={newNum}
                handleNumChange={handleNumChange}
            />
            
            <h2>Numbers</h2>
            <ul>
                {persons
                    .filter(it => it.name.toLowerCase().indexOf(searchTerm.toLowerCase())>=0)
                    .map(it => (
                    <Person key={it.id} data={it} />
                ))}
            </ul>
        </div>
    )
}

export default App
