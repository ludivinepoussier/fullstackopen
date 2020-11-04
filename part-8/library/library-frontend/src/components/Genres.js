import React from 'react'

const Genres = ({ genres, genreSelected, clear }) => {
  return (
    <div>
      {genres.map(genre => {
        return <button onClick={() => genreSelected(genre)} key={genre}>{genre}</button>
      })}
      <button onClick={() => clear()}>all genres</button>
    </div>
  )
}

export default Genres
