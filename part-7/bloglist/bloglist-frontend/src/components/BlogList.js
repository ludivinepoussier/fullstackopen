import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, removeBlog, addLikes }) => {

  return (
    <>
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
    </>
  )
}

export default BlogList