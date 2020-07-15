import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import List from './components/List'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')

    useEffect(() => {
        async function fetchData() {
        const initialPersons = await personService.getAll()
        setPersons(initialPersons)
        }
        fetchData()
    }, [])

    const changeNum = async () => {
        const oldEntry = persons.find(it => it.name === newName)
        const newEntry = { ...oldEntry, num: newNum }
        await personService.change(oldEntry.id, newEntry)

        const updatedPersons = persons.map(it => it === oldEntry
            ? newEntry
            : it)
        setPersons(updatedPersons)   
    }

    const addPerson = async event => {
        event.preventDefault()

        const personObject = {
            name: newName,
            num: newNum
        }

        if (persons.some(it => it.name.toLowerCase() === newName.toLowerCase())) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                changeNum(newNum)
            }
            setNewName('')
            setNewNum('')
        } else {
            const returnedPerson = await personService.create(personObject)
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNum('')           
        }
    }

    const removePerson = id => {
        const person = persons.find(it => it.id === id)

        if (window.confirm(`Delete ${person.name} ?`)) {
            personService.remove(id)
            setPersons(persons.filter(it => it.id !== id))
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
                    removePerson={removePerson}
                />
            </ul>
        </div>
    )
}

export default App
