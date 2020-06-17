import React, { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import List from './components/List'

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

        if (persons.some(it => it.name.toLowerCase() === newName.toLowerCase())) {
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
            <Filter 
                searchTerm={searchTerm}
                handleFilterChange={handleFilterChange}
            />

            <h3>Add a new contact</h3>

            <PersonForm 
                addPerson={addPerson} 
                newName={newName}
                handleNameChange={handleNameChange}
                newNum={newNum}
                handleNumChange={handleNumChange}
            />
            
            <h2>Contact List</h2>
            <ul>
                <List 
                    persons={persons}
                    searchTerm={searchTerm}
                />
            </ul>
        </div>
    )
}

export default App
