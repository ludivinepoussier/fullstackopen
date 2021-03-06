import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import NotificationError from './components/NotificationError'
import NotificationSuccess from './components/NotificationSuccess'
import Togglable from './components/Togglable'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setSuccessMessage(`new blog added: ${blogObject.title} by ${blogObject.author}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
    catch (error) {
      console.log(error)
    }
  }

  const addLikes = async (id) => {
    const blog = blogs.find(it => it.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      const returnedBlog = await blogService.update(id, changedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      setSuccessMessage('blog updated')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
    catch (error) {
      setErrorMessage(`something went wrong: ${error}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log(error)
    }
  }

  const removeBlog = async id => {
    const blog = blogs.find(it => it.id === id)

    if (window.confirm(`Delete ${blog.title} ?`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(it => it.id !== id))
        setSuccessMessage(`${blog.title} has been deleted`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
      catch (error) {
        setErrorMessage(`something went wrong: ${error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        const serverBlogs = await blogService.getAll()
        setBlogs(serverBlogs)
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
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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

      <NotificationError message={errorMessage} />
      <NotificationSuccess message={successMessage} />

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
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog => <Blog className='blogList' key={blog.id} blog={blog} changeBlog={() => addLikes(blog.id)} removeBlog={() => removeBlog(blog.id)}/> )}
        </div>
      }

    </div>
  )
}

export default App
