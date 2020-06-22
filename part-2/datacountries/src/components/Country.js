import React from "react";

const Country = ({ data }) => {

    const countryLanguages = (languages) =>
        languages.map(language => <li key={language.name}>{language.name}</li>)

    return (
        <div>
            <h1>{data.name}</h1>
            <p>Capital: {data.capital}</p>
            <p>Population: {data.population}</p>
            <h3>Languages</h3>
            <ul>{countryLanguages(data.languages)}</ul>
            <img src={data.flag} width="150px" />
        </div>

    )
}

export default Country
