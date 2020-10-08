import React from 'react'

import { useDispatch } from 'react-redux'

import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import {
  BrowserRouter as Router,
  useRouteMatch, Link
} from 'react-router-dom'

import Notification from './Notification'
import Login from './Login'

const Blog = ({ blogs }) => {

  const dispatch = useDispatch()

  const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

  const notifyWith = (message, success) => {
    dispatch(setNotification(message, success, 5))
  }

  const addLikes = blogObject => {
    dispatch(likeBlog(blogObject))
    notifyWith(`blog updated`, 'success')
  }

  const removeBlog = blogObject => {
    if (window.confirm(`Delete ${blogObject.title} ?`)) {
      dispatch(deleteBlog(blogObject))
      notifyWith(`${blogObject.title} has been deleted`, 'success')
    }
  }

  const matchBlog = useRouteMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

  if (!blog) {
    console.log(`BLOG IS ${blog}`)
    return null
  }

  return (
    <>
      <div>
          <h1>Blogs App</h1>
          <Notification />
          <Login />
      </div>
      <div>
        <h2>{`${blog.title}`}</h2>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>{`${blog.likes} likes`} <button id='like-button' onClick={() => addLikes(blog)}>like</button> </p>
        <p>added by {blog.author}</p>
        <p>
          {
            loggedUser.username === blog.user.username &&
        <Link to="/">
          <button type='button' value={blog.id} onClick={() => removeBlog(blog)}>remove</button>
        </Link>
          }
        </p>
      </div>
    </>
  )}

export default Blog
