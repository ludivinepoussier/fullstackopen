import React from 'react'
import Country from './Country'

const List = ({ countries, searchTerm }) => {
    return (
        countries.filter(it => it.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0)
            .map(it => (
                <Country key={it.name} data={it} />
            ))

    )
}

export default List
