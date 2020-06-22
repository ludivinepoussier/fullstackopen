import React from 'react'

const Filter = ({ searchTerm, handleFilterChange }) => {
    return (
        <>
        <label>Find countries </label>
        <input
            value={searchTerm}
            onChange={handleFilterChange}
        />
        </>
    )
}

export default Filter
