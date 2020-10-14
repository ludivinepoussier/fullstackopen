import React from 'react'

import { useDispatch } from 'react-redux'

import { likeBlog, deleteBlog, createComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import {
  BrowserRouter as Router,
  useRouteMatch, Link
} from 'react-router-dom'

import Notification from './Notification'

import styled from 'styled-components'

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

  const addComment = (e, id) => {
    e.preventDefault()
    const {comment} = e.target
    dispatch(createComment(comment.value, id))
    e.target.reset()
    notifyWith(`comment added`, 'success')
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
      <Notification />
      <StyleDiv>
        <div>
          <h1>Blogs App</h1>
        </div>
        <div>
          <h2>{`${blog.title}`}</h2>
          <p><a href={blog.url}>{blog.url}</a></p>
          <p>{`${blog.likes} likes`} <button id='like-button' onClick={() => addLikes(blog)}>like</button> </p>
          <p>added by {blog.author}</p>
          <h3>comments</h3>
          <form onSubmit={(e) => addComment(e, blog.id)}>
            <input 
            name='comment'
            type='text'
            />
            <button type='submit'>add comment</button>
          </form>
          <Ul>
            {
              blog.comments
                .map((comment, index) =>
                    <li key={index}>{comment}</li>
                )
            }
          </Ul>
          <p>
            {
              loggedUser.username === blog.user.username &&
          <Link to="/">
            <button type='button' value={blog.id} onClick={() => removeBlog(blog)}>remove</button>
          </Link>
            }
          </p>
        </div>
      </StyleDiv>
    </>
  )}

const StyleDiv = styled.div`
  width: 25%;
  margin: 2rem auto;
  border: thick double black;
  border-radius: 5rem;
  padding: 2rem;
  background: rgb(247, 237, 130);

  & a {
  color: black;
  }
`
const Ul = styled.ul`
  list-style-position: inside;
`

export default Blog
