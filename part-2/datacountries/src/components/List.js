import React from 'react'
import Country from './Country'
import Names from './Names'

const List = ({ countries, searchTerm }) => {

    if (!searchTerm) return <div></div>
    
    const filtered = countries.filter(it => it.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0)

    if (filtered.length === 0) return <div>no macth found</div>
    if (filtered.length === 1) return <Country data={filtered[0]} />
    if (filtered.length < 11) return filtered
        .map(it => (<Names key={it.name} data={it} />))
    return <div>too many macthes</div>
}

export default List
