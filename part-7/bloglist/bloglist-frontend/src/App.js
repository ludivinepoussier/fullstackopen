import React, { useEffect  } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import './index.css'

import { initializeBlogs, } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { useDispatch } from 'react-redux'
import Login from './components/Login'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h1>Blogs App</h1>

      <Notification />

      <Login />

      <BlogList />
    </div>
  )
}

export default App
