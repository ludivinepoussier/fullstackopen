import React, { useState } from 'react'

const Blog = ({ blog, changeBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const notShowingDetails = { display: showDetails ? 'none' : '' }
  const showingDetails = { display: showDetails ? '' : 'none' }

  const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    padding: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const paraStyle = {
    marginTop: 0,
    marginBottom: 0
  }

  return (
    <div style={blogStyle}>
      <div style={notShowingDetails} className='notShowingDetails'>
        {blog.title} by {blog.author} <button onClick={toggleDetails}>show</button>
      </div>
      <div style={showingDetails} className='showingDetails'>
        <p style={paraStyle}>{`${blog.title} by ${blog.author}`} <button onClick={toggleDetails}>hide</button> </p>
        <p style={paraStyle}>{`url: ${blog.url}`}</p>
        <p style={paraStyle}>{`likes: ${blog.likes}`} <button onClick={changeBlog}>like</button> </p>
        <p style={paraStyle}>
          {
            loggedUser.username === blog.user.username &&
        <button type='button' value={blog.id} onClick={removeBlog}>remove</button>
          }
        </p>
      </div>
    </div>
  )}

export default Blog
