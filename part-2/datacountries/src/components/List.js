import React from "react";
import CountryDetails from './CountryDetails'
import CountryRow from './CountryRow'

const List = ({ countries, searchTerm }) => {
    
    if (!searchTerm) return <div></div>
    
    const filtered = countries.filter(it => it.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0)

    if (filtered.length === 0) return <div>no match found</div>
    if (filtered.length === 1) return <CountryDetails data={filtered[0]} />
    if (filtered.length < 11) return filtered.map(it => (<CountryRow key={it.name} data={it} />))
    return <div>too many matches</div>
}

export default List
