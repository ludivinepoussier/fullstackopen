import React, { useState } from 'react'
import Select from 'react-select'

import { EDIT_BORN, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const authors = props.authors.loading ? [] : props.authors.data.allAuthors

  const [editBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) return null

  const options = authors.map(author => ({ 'value': author.name, 'label': author.name }))
  const handleSelectAuthor = ({value}) => setName(value)
  const handleChangeBorn = ({target}) => setBorn(Number(target.value))

  const submit = (event) => {
    event.preventDefault()

    editBorn({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(author =>
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            placeholder='Select author...'
            onChange={handleSelectAuthor}
            options={options}
          />
          
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={handleChangeBorn}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
