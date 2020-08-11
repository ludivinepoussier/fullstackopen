const mongoose = require('mongoose')

// to avoid error message: DeprecationWarning
mongoose.set('useFindAndModify', false)

// connect to mongodb
const mongourl = process.env.MONGODB_URI

console.log('connecting to', mongourl)

mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(_result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

// model Blog
const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)
