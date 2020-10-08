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
        <div>
          {
          blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Link to={`/blogs/${blog.id}`} key={blog.title}>
              <p key={blog.id}> {blog.title} by {blog.author} </p>
              </Link>
            )
          }
        </div>
      </>
  )
}

export default BlogList