import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom'

import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Notification from './Notification'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import styled from 'styled-components'

const BlogList = ({ blogs }) => {

  const dispatch = useDispatch()

  const userLoggedIn = useSelector((state) => state.login)

  const notifyWith = (message, success) => {
    dispatch(setNotification(message, success, 5))
  }

  const addBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    notifyWith(`a new blog '${blogObject.title}' by ${blogObject.author} added!`, 'success')
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    
      userLoggedIn &&
      <>
        <div>
        <Notification />
          <h1>Blogs App</h1>
        </div>
        <div>{blogForm()}</div>
        <h2>List of blogs</h2>
        <List>
          {
          blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Link to={`/blogs/${blog.id}`} key={blog.title}>
              <p key={blog.id}> {blog.title} by {blog.author} </p>
              </Link>
            )
          }
        </List>
      </>
  )
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: thick double black;
  padding: 2rem;
  border-radius: 5rem;
  background: rgb(210, 241, 181);
  max-width: 80%;
  margin: 0 auto;

  & a {
    color: black;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`

export default BlogList