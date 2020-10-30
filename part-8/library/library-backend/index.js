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
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: () => {
      // if (args.author && args.genre) return books.filter(book => book.author === args.author && book.genres.includes(args.genre))
      // if (args.author) return books.filter(book => book.author === args.author)
      // if (args.genre) return books.filter(book => book.genres.includes(args.genre))
      return Book.find({}).populate('author')
    },

    allAuthors: () => {
      return Author.find({})
  }
  },

  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args })
      const savedBook = await book.save()
      return Book.populate(savedBook, {path:'author'})
    },
    
    editAuthor: (root, args) => {
      // const author = authors.find(author => author.name === args.name)
      // if (!author) {
      //   return null
      // }

      // const updatedAuthor = { ...author, born: args.born }
      // authors = authors.map(author => author.name === args.name ? updatedAuthor : author)
      // return updatedAuthor
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
