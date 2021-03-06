const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

// routes to /api/blogs
blogsRouter.get('/', handlBlogeGetAll)
blogsRouter.post('/', handleBlogPost)
blogsRouter.get('/:id', handlBlogeGetOne)
blogsRouter.put('/:id', handleBlogPut)
blogsRouter.delete('/:id', handleBlogDelete)
blogsRouter.post('/:id/comments', handleBlogComment)


async function handlBlogeGetAll(request, response) {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
}

async function handleBlogPost(request, response) {
  const blog = new Blog(request.body)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!blog.url || !blog.title) {
    return response.status(400).send({ error: 'title or url missing ' })
  }

  blog.user = user
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
}

async function handlBlogeGetOne(request, response) {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
}

async function handleBlogPut(request, response) {
  const blog = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1, id: 1 })
  response.json(updatedBlog.toJSON())
}

async function handleBlogDelete(request, response) {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'only the creator can delete blogs' })
  }

  await blog.remove()
  user.blogs = user.blogs.filter(b => b.id.toString() !== request.params.id.toString())
  await user.save()
  response.status(204).end()
}

async function handleBlogComment(request, response) {
  const id = request.params.id

  if (request.body.comments) {
    const commentedBlog = await Blog
      .findByIdAndUpdate(id, { ['$addToSet']: { comments: request.body.comments } },
        { new: true }
      )
      .populate('user', { username: 1, name: 1, id: 1 })
    response.json(commentedBlog)
  }
  else {
    response.status(400).send({ error: 'Comment is missing' })
  }
}

module.exports = blogsRouter
