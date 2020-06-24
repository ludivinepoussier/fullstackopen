import React, { useState } from "react";
import Button from "./Button"
import CountryDetails from "./CountryDetails"

const CountryName = ({ data }) => {
    const [clicked, setClicked] = useState(false)
    const handleClickShow = () => setClicked(!clicked)

    return (
        <ul>
            <li>
                {data.name} <Button onClick={handleClickShow} text='Show' />
                {clicked ? <CountryDetails data={data} /> : null}
            </li>
        </ul>
    )
}

export default CountryName
