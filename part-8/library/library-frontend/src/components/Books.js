import React, { useState, useEffect } from 'react'

import Genres from './Genres'

const Books = (props) => {

  const [booksToShow, setBooksToShow] = useState([])
  const [genres, setGenres] = useState([])

  const books = props.books.loading ? [] : props.books.data.allBooks

  useEffect(() => {
    const genresArray = books.reduce((acc, cur) => {
      return acc.concat(cur.genres)
    }, [])

    setGenres(Array.from(new Set(genresArray)));
    setBooksToShow(books)
  }, [books]) // eslint-disable-line

  if (!props.show) return null

  const genreSelected = genre => {
    setBooksToShow(books.filter(book => book.genres.includes(genre)))
  }

  const clearGenreFilter = () => {
    setBooksToShow(books)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>book</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <Genres genres={genres} genreSelected={genreSelected} clear={clearGenreFilter} />
    </div>
  )
}

export default Books
