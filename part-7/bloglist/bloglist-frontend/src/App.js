import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './index.css'

import { initializeBlogs, createBlog, likeBlog } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

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

  const addBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    notifyWith(`a new blog '${blogObject.title}' by ${blogObject.author} added!`, 'success')
  }

  const addLikes = blogObject => {
    dispatch(likeBlog(blogObject))
    notifyWith(`blog updated`, 'success')
  }

  const removeBlog = async id => {
    const blog = blogs.find(it => it.id === id)

    if (window.confirm(`Delete ${blog.title} ?`)) {
      try {
        await blogService.remove(id)
        // setBlogs(blogs.filter(it => it.id !== id))
        alert('not implemented')

        notifyWith(`${blog.title} has been deleted`, 'success')
      }
      catch (error) {
        notifyWith(`something went wrong: ${error}`)
        const serverBlogs = await blogService.getAll()
        // setBlogs(serverBlogs)
        alert('not implemented')

      }
    }
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

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
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
            {blogForm()}
          </div>
          <h2>List of blogs</h2>
          <BlogList blogs={blogs} removeBlog={removeBlog} addLikes={addLikes}/>
        </div>
      }

    </div>
  )
}

export default App
