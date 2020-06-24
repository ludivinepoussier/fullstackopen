import React from "react";
import Button from "./Button"
import CountryDetails from "./CountryDetails";

const handleClickShow = () => {
    return (
        <CountryDetails />
    )
}

const CountryName = ({ data }) => {

    return (
        <ul>
            <li>{data.name} <Button onClick={handleClickShow} text='Show'/></li>
        </ul>

    )
}

export default CountryName
