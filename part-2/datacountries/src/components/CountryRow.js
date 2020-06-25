import React, { useState } from 'react'
import CountryName from './CountryName'
import CountryDetails from './CountryDetails'
import Button from './Button'

const CountryRow = ({ data }) => {
    const [clicked, setClicked] = useState(false)
    const handleClickShow = () => setClicked(!clicked)

    if (!clicked) {
        return (
            <p>
                <CountryName data={data} /> <Button onClick={handleClickShow} text = 'Show Country details' />
            </p>
        )
    }
    if (clicked) {
        return (
            <div><CountryDetails data={data} /> <Button onClick={handleClickShow} text='Return to List' /></div>
        )
    }
}

export default CountryRow
