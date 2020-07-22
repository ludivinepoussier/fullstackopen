import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import List from './components/List'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    const [notificationMsg, setNotificationMsg] = useState(null)
    const [notificationSuccess, setNotificationSuccess] = useState(true)

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
        try {
            await personService.change(oldEntry.id, newEntry)
            const updatedPersons = persons.map(it => it === oldEntry
                ? newEntry
                : it)
            setPersons(updatedPersons)
            setNotificationMsg(`${newName} has been updated`)
            setNotificationSuccess(true)
            setTimeout(() => {
                setNotificationMsg(null)
            }, 5000)
        }
        catch {
            setNotificationMsg(`${newName} has already been removed from server`)
            setNotificationSuccess(false)
            setTimeout(() => {
                setNotificationMsg(null)
            }, 5000)
            const serverPersons = await personService.getAll()
            setPersons(serverPersons)
        }
        
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
            setNotificationMsg(`${newName} has been added`)
            setNotificationSuccess(true)
            setTimeout(() => {
                setNotificationMsg(null)
            }, 5000)          
        }
    }

    const removePerson = async (id) => {
        const person = persons.find(it => it.id === id)

        if (window.confirm(`Delete ${person.name} ?`)) {
            try {
                await personService.remove(id)
                setPersons(persons.filter(it => it.id !== id))
                setNotificationMsg(`${person.name} has been deleted`)
                setNotificationSuccess(true)
                setTimeout(() => {
                    setNotificationMsg(null)
                }, 5000)
            }
            catch {
                setNotificationMsg(`${person.name} has already been removed from server`)
                setNotificationSuccess(false)
                setTimeout(() => {
                    setNotificationMsg(null)
                }, 5000)
                const serverPersons = await personService.getAll()
                setPersons(serverPersons)
            }
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
            <Notification message={notificationMsg} success={notificationSuccess}/>
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
