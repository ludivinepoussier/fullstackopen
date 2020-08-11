if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const morgan = require('morgan')
const app = express()
const Blog = require('./models/blog')

const cors = require('cors')

const morganLog = morgan((tokens, req, res) => {
    const customLog = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')

    return req.method === 'POST' ? `${customLog} ${JSON.stringify(req.body)}` : customLog
})

app.use(cors())
app.use(express.json())
app.use(morganLog)

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.get('/api/blogs/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

app.delete('/api/blogs/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
        .then(_result => {
            response.status(204).end()
        })
        .catch(error => next(error))   
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
