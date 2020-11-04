import React, { useState, useEffect } from 'react'
import Select from 'react-select'

import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = ({ show }) => {

  const [variables, setVariables] = useState({})

  const allGenres = useQuery(ALL_GENRES)
  const { loading, data, refetch } = useQuery(ALL_BOOKS, {
    variables
  })

  useEffect(() => {
    refetch(variables)
  }, [refetch, variables])

  if (!show) return null

  const options = allGenres.data.allGenres.map(genre => ({ 'label': genre, 'genre': genre }))
  const handleSelectGenre = (genre) => setVariables({ genre: genre.genre })

  if (loading) return <div>loading...</div>
  
  return (
    <div>
      <h2>books</h2>
      <div>
        <Select
          placeholder='Select genre...'
          onChange={handleSelectGenre}
          options={options}
        />
        {variables.genre && (
          <button onClick={() => setVariables({ genre: '' })}>
            All genres
          </button>
        )}
      </div>

      <table>
        <tbody>
          <tr>
            <th>&nbsp;</th>
            <th></th>
            <th>author of the book</th>
            <th>&nbsp;</th>
            <th>published</th>
          </tr>
          {data.allBooks.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>&nbsp;</td>
              <td>{book.author.name}</td>
              <td>&nbsp;</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
