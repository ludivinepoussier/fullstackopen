import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Recommendations from './components/Recommendations'

import { useQuery, useApolloClient } from '@apollo/client'

import { ALL_AUTHORS, USER } from './queries'
import { ALL_BOOKS } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')

  const user = useQuery(USER)
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors show={page === 'authors'} authors={authors} token={token} />

        <Books show={page === 'books'} books={books} />

        <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} setError={notify} />

      </div>
    )
  }

  const logout = () => {
    setToken(null)
    setPage('books')
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout} >logout</button>
      </div>

      <Authors show={page === 'authors'} authors={authors} token={token} />

      <Books show={page === 'books'} books={books} />

      <Recommendations show={page === 'recommend'} books={books} user={user} />

      <NewBook show={page === 'add'} setPage={setPage} />

    </div>
  )
}

export default App
