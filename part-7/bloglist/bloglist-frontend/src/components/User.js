import React from 'react'

import {
  BrowserRouter as Router,
  useRouteMatch
} from 'react-router-dom'

import Notification from './Notification'
import Login from './Login'

const User = ({users}) => {

  const matchUser = useRouteMatch('/users/:id')
  const user = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  if (!user) {
    return null
  }

  return (
    <>
      <div>
        <h1>Blogs App</h1>
        <Notification />
        <Login />
      </div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </>  
  )
}

export default User
