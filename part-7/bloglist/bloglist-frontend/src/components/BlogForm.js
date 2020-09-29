import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewBlogTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <>
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
        <p>blog title &nbsp;
          <input
            id='title'
            value={newBlogTitle}
            onChange={handleTitleChange}
          />
        </p>
        <p>author &nbsp;
          <input
            id='author'
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </p>
        <p>url &nbsp;
          <input
            id='url'
            value={newUrl}
            onChange={handleURLChange}
          />
        </p>
        <button type="submit">add to the blog list</button>
      </form>
    </>
  )
}

export default BlogForm
