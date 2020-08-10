import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [newUpvotes, setNewUpvotes] = useState('')

    useEffect(() => {
        async function fetchData() {
            const initialBlogs = await blogService.getAll()
            setBlogs(initialBlogs)
        }
        fetchData()
    }, [])

    const changeData = async () => {
        const oldEntry = blogs.find(it => it.title.toLowerCase() === newBlogTitle.toLowerCase())
        const newEntry = { ...oldEntry, author: newAuthor, url: newUrl, upvotes: newUpvotes}
        try {
            await blogService.change(oldEntry.id, newEntry)
            const updatedBlogs = blogs.map(it => it === oldEntry
                ? newEntry
                : it)
            setBlogs(updatedBlogs)
        }
        catch (error) {
            const serverPersons = await blogService.getAll()
            setBlogs(serverPersons)
        }
    }

    const addBlog = async event => {
        event.preventDefault()

        const blogObject = {
            title: newBlogTitle,
            author: newAuthor,
            address: newUrl,
            upvotes: newUpvotes
        }

        if (blogs.some(it => it.title.toLowerCase() === newBlogTitle.toLowerCase())) {
            if (window.confirm(`${newBlogTitle} is already added to bloglist, do you want to update the informations?`)) {
                changeData(newAuthor)
            }
            setNewBlogTitle('')
            setNewAuthor('')
            setNewUrl('')
            setNewUpvotes('')
        } else {
            try {
                const returnedBlog = await blogService.create(blogObject)
                setBlogs(blogs.concat(returnedBlog))
                setNewBlogTitle('')
                setNewAuthor('')
                setNewUrl('')
                setNewUpvotes('')
            }
            catch (error) {
                setNewBlogTitle('')
                setNewAuthor('')
                setNewUrl('')
                setNewUpvotes('')
            }
        }
    }

    const removeBlog = async (id) => {
        const blog = blogs.find(it => it.id === id)

        if (window.confirm(`Delete ${blog.title} ?`)) {
            try {
                await blogService.remove(id)
                setBlogs(blogs.filter(it => it.id !== id))
            }
            catch {
                const serverBlogs = await blogService.getAll()
                setBlogs(serverBlogs)
            }
        }
    }

    const handleTitleChange = (event) => {
        setNewBlogTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }

    const handleURLChange = (event) => {
        setNewUrl(event.target.value)
    }

    const handleUpvotesChange = (event) => {
        setNewUpvotes(event.target.value)
    }

    return (
        <div>
            <h2>Blog List</h2>

            <h3>Add a new blog</h3>

            <BlogForm
                addBlog={addBlog}
                newBlogTitle={newBlogTitle}
                handleTitleChange={handleTitleChange}
                newAuthor={newAuthor}
                handleAuthorChange={handleAuthorChange}
                newUrl={newUrl}
                handleURLChange={handleURLChange}
                newUpvotes={newUpvotes}
                handleUpvotesChange={handleUpvotesChange}
            />

            <h2>List</h2>
            <ul>
                <BlogList
                    blogs={blogs}
                    removeBlog={removeBlog}
                />
            </ul>
        </div>
    )
}

export default App
