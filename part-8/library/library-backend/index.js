require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
// const uuid = require('uuid/v1')

const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')

console.log('connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      born: Int!
    ): Author
    addAuthor(
      name: String!
      born: Int
    ): Author
  }
`

const resolvers = {
  Author: {
    bookCount: async ({ name }) => {
      const author = await Author.findOne({ name }).select('id')
      return Book.find({ author }).countDocuments()
    }
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      if (args.author && args.genre)
        return await Book.find({ $and: [{ author: { $all: author.id } }, { genres: { $all: args.genre } }] }).populate('author')
      if (args.author)
        return await Book.find({ author: { $all: author.id } }).populate('author')
      if (args.genre)
        return await Book.find({ genres: { $all: args.genre } }).populate('author')
      return Book.find({}).populate('author')
    },
    allAuthors: () => {
      return Author.find({})
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const newBook = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres
      })
      let authorId = await Author.findOne({ name: args.author }).select('id')
      if (!authorId) {
        const newAuthor = new Author({ name: args.author })
        await newAuthor.save()
        authorId = newAuthor.id
      }
      newBook.author = authorId
      await newBook.save()
      return Book.findOne({title: args.title}).populate('author')
    },
    editAuthor: (root, args) => {
      return Author.findOneAndUpdate({name: args.name}, {born: args.born}, {new: true})
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
