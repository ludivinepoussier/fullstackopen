import React, { useState } from 'react'

import blogService from '../services/blogs'
import loginService from '../services/login'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { logout, login } from '../reducers/loginReducer'

import styled from 'styled-components'

const Login = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector((state) => state.login)

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
      dispatch(login(username, password))
      setUsername('')
      setPassword('')
      notifyWith(`${user.name} welcome back!`, 'success')
    } catch (exception) {
      notifyWith('wrong username/password')
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logout())
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
    <>
      {user === null ?
        loginForm() :
        <Logged>{user.name} logged in <button onClick={handleLogout}>logout</button></Logged>
      }
    </>
  )
}

const Logged = styled.div`
  color: rgb(6, 73, 135);
`
export default Login
