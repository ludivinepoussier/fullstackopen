import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('https://')
  const [newLikes, setNewLikes] = useState('')
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

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNewBlogTitle('')
      setNewAuthor('')
      setNewUrl('https://')
      setNewLikes('')
    }
    catch (error) {
      setNewBlogTitle('')
      setNewAuthor('')
      setNewUrl('https://')
      setNewLikes('')
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
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password &nbsp;
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleLikesChange = (event) => {
    setNewLikes(event.target.value)
  }

  const blogForm = () => (
    <>
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
        <p>blog title &nbsp;
        <input
          value={newBlogTitle}
          onChange={handleTitleChange}
        />
        </p>
        <p>author &nbsp;
        <input
          value={newAuthor}
          onChange={handleAuthorChange}
        />
        </p>
        <p>url &nbsp;
        <input
          value={newUrl}
          onChange={handleURLChange}
        />
        </p>
        <p>likes &nbsp;
        <input
          value={newLikes}
          onChange={handleLikesChange}
        />
        </p>
        <button type="submit">add to the blog list</button>
      </form>
    </>
  )

  return (
    <div>
      <h1>Blogs App</h1>

      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <div>
            <p>{user.username} logged in</p>
            <button onClick={logout}>
              logout
            </button>
          </div>
          {blogForm()}
          <h2>List of blogs</h2>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} /> )}
        </div>
      }

    </div>
  )
}

export default App
