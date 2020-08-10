import React from 'react'

const BlogForm = ({ addBlog, newBlogTitle, handleTitleChange, newAuthor, 
    handleAuthorChange, newUrl, handleURLChange, newUpvotes, handleUpvotesChange }) => {
    return (
        <form onSubmit={addBlog}>
            <div>
                Blog:
                &nbsp;
                <input
                    value={newBlogTitle}
                    onChange={handleTitleChange} />
            </div>
            <div>
                Author:
                &nbsp;
                <input
                    value={newAuthor}
                    onChange={handleAuthorChange} />
            </div>
            <div>
                URL:
                &nbsp;
                <input
                    value={newUrl}
                    onChange={handleURLChange} />
            </div>
            <div>
                Upvotes:
                &nbsp;
                <input
                    value={newUpvotes}
                    onChange={handleUpvotesChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default BlogForm
