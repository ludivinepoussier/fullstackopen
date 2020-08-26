import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const notShowingDetails = { display: showDetails ? 'none' : '' }
  const showingDetails = { display: showDetails ? '' : 'none' }

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
    <div style={notShowingDetails}>
      {blog.title} by {blog.author} <button onClick={toggleDetails}>show</button>
    </div>
    <div style={showingDetails}>
      <p style={paraStyle}>{`${blog.title} by ${blog.author}`} <button onClick={toggleDetails}>hide</button> </p>
      <p style={paraStyle}>{`url: ${blog.url}`}</p>
        <p style={paraStyle}>{`likes: ${blog.likes}`} <button>like</button> </p>
    </div>
  </div>
)}

export default Blog
