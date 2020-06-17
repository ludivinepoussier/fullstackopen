import React from 'react'

const Filter = ({ searchTerm, handleFilterChange}) => {
    return (
        <input
            value={searchTerm}
            onChange={handleFilterChange}
        />
    )
}

export default Filter