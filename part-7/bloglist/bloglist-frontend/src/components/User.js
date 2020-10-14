import React from 'react'

import {
  BrowserRouter as Router,
  useRouteMatch
} from 'react-router-dom'

import Notification from './Notification'

import styled from 'styled-components'

const User = ({users}) => {

  const matchUser = useRouteMatch('/users/:id')
  const user = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  if (!user) {
    return null
  }

  return (
    <StyleDiv>
      <div>
        <Notification />
        <h1>Blogs App</h1>
      </div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </StyleDiv>  
  )
}

const StyleDiv = styled.div`
  width: 25%;
  margin: 2rem auto;
  border: thick double black;
  border-radius: 5rem;
  padding: 2rem;
  background: rgb(238, 172, 93);

  & a {
  color: black;
  }
`
const Ul = styled.ul`
  list-style-position: inside;
`

export default User
