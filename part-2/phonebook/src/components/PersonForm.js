import React from 'react'

const PersonForm = ({ addPerson, newName, handleNameChange, newNum, handleNumChange}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name:&nbsp;
                            <input
                    value={newName}
                    onChange={handleNameChange} />
            </div>
            <div>
                number:&nbsp;
                            <input
                    value={newNum}
                    onChange={handleNumChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
