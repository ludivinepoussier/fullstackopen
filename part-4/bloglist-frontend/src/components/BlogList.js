import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, removeBlog }) => {
    return (
        blogs.map(it => (
                <Blog key={it.title} data={it} removeBlog={removeBlog} />
            ))
    )
}

export default BlogList
