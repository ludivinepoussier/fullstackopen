import React, { useState, useEffect  } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'

import { initializeBlogs, } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, success) => {
    dispatch(setNotification(message, success, 5))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notifyWith(`${user.name} welcome back!`, 'success')
    } catch (exception) {
      notifyWith('wrong username/password')
      setUsername('')
      setPassword('')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Log in to application</h2>
        username &nbsp;
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password &nbsp;
        <input
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )

  return (
    <div>
      <h1>Blogs App</h1>

      <Notification />

      {user === null ?
        loginForm() :
        <div>
          <div>
            <p>{user.name} logged in</p>
            <button onClick={logout}>
              logout
            </button>
          </div>
          <h2>List of blogs</h2>
          <BlogList />
        </div>
      }

    </div>
  )
}

export default App
