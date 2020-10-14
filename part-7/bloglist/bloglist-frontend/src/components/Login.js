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
    <LoginForm>
      <form onSubmit={handleLogin}>
        <Border>
          <h2>Log in to application</h2>
          <p>
            username &nbsp;
            <input
              id='username'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </p>
          <p>
            password &nbsp;
            <input
              id='password'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </p>
          <button id='login-button' type="submit">login</button>
        </Border>
      </form>
    </LoginForm>
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
  margin: .7rem;
  color: black;
`

const LoginForm = styled.div`
  width: 25%;
  margin: 2rem auto;
  border-radius: 5rem;
  padding: 2rem;

  & a {
  color: black;
  }
`
const Border = styled.div`
  border: thick double black;
  border-radius: 3rem;
  padding: 2rem;
  background: rgb(172, 245, 218);
`
export default Login
