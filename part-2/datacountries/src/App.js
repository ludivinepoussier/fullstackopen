import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import List from './components/List'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [capital, setCapital] = useState([]); 
  const [population, setPopulation] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [flag, setFlag] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all?fields=capital;flag;languages;population;name')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
    <div>
      <Filter
        searchTerm={searchTerm}
        handleFilterChange={handleFilterChange}
      />
    </div>
    <div>
      <List
          countries={countries}
          capital={capital}
          population={population}
          languages={languages.name}
          flag={flag}
          searchTerm={searchTerm}
      />
    </div>
    </>
  )
}

export default App

