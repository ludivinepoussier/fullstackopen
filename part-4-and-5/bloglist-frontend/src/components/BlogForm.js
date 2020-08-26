import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleLikesChange = (event) => {
    setNewLikes(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    })

    setNewBlogTitle('')
    setNewAuthor('')
    setNewUrl('')
    setNewLikes('')
  }

  return (
    <>
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
        <p>blog title &nbsp;
        <input
            value={newBlogTitle}
            onChange={handleTitleChange}
          />
        </p>
        <p>author &nbsp;
        <input
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </p>
        <p>url &nbsp;
        <input
            value={newUrl}
            onChange={handleURLChange}
          />
        </p>
        <p>likes &nbsp;
        <input
            value={newLikes}
            onChange={handleLikesChange}
          />
        </p>
        <button type="submit">add to the blog list</button>
      </form>
    </>
  )
}

export default BlogForm
