import React, { useState } from 'react'
import Person from './components/Person'

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
            <form onSubmit={addPerson}>
                <div>
                    name:&nbsp;
                    <input 
                        value={newName}
                        onChange={handleNameChange}/>
                </div>
                <div>
                    number:&nbsp; 
                    <input 
                        value={newNum}
                        onChange={handleNumChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
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
