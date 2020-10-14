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
import Login from './components/Login'
import styled from 'styled-components'
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

  return (
    <Router>

      <NavBar>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        <Login />
      </NavBar>

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

const NavBar = styled.div`
  marginBottom: 10;
  height: 3rem;
  border: thick double black;
  border-radius: 1rem;
  padding-left: 1rem;
  display: flex;
  flex-direction: row;

  & a {
    margin: .3rem;
    padding: .5rem;
    color: black;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      background: black;
      color: white;
    }
  }
`

export default App
