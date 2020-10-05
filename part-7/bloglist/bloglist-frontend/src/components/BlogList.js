import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { likeBlog, deleteBlog, createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = () => {

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)

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
    <>
      <div>{blogForm()}</div>

      <div>
        {
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog
              className='blogList'
              key={blog.id}
              blog={blog}
              addLikes={() => addLikes(blog)}
              removeBlog={() => removeBlog(blog)}
            />
          )
        }
      </div>
    </>
  )
}

export default BlogList