import React, { useEffect  } from 'react'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

import blogService from './services/blogs'

import { initializeBlogs, } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

import './index.css'

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

  const users = useSelector((state) => state.users)
  const blogs = useSelector(state => state.blogs)

  const padding = {
    padding: 5
  }

  return (
    <Router>

      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <Switch>
        <Route path="/blogs/:id">
          <Blog blogs={blogs} />
        </Route>
        <Route path="/users/:id">
          <User users={users} />
        </Route>
        <Route path="/users">
          <Users users={users} />
        </Route>
        <Route path="/">
          <BlogList blogs={blogs} />
        </Route>
      </Switch>

    </Router>
  )
}

export default App
