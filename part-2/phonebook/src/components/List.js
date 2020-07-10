import React from 'react'
import Person from './Person'

const List = ({persons, searchTerm, removePerson}) => {
    return (
        persons.filter(it => it.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0)
                .map(it => (
                    <Person key={it.name} data={it} removePerson={removePerson}/>
                ))
    )
}

export default List
