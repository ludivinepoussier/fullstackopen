import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const USER = gql`{
  me {
    username
    favoriteGenre
  }
}`

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    bookCount
    id
  }
}
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
		allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
      id
  }
}
`

export const ALL_GENRES = gql`
query	{
		allGenres
  }
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]! ) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author {
      name
    }
    published
    genres
    id
  }
}
`

export const EDIT_BORN = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, born: $born) {
    name
    born
    id
  }
}
`
