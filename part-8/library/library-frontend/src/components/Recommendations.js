import React from 'react'

const Recommendations = ({ user, show, books }) => {

  if (!show || !user) return null

  const userFavoriteGenre = user.data.me.favoriteGenre
  const userFavoriteBooks = books.data.allBooks.filter(book => book.genres.includes(userFavoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{userFavoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th>
              book
              </th>
            <th>
              author
              </th>
            <th>
              published
              </th>
          </tr>
          {userFavoriteBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
