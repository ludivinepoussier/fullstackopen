const healthRouter = require('express').Router()

healthRouter.get('/', async (request, response) => {
  response.json('Hello World')
})

module.exports = healthRouter
