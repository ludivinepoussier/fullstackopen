import React from 'react'
import { useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom'

import Notification from './Notification'

import styled from 'styled-components'

const Users = ({users}) => {

  const userLoggedIn = useSelector((state) => state.login)

  const padding = {
    paddingRight: 20
  }

  return (
    userLoggedIn &&
    <>
      <div>
        <Notification />
        <h1>Blogs App</h1>
      </div>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user =>
              <tr key={user.id}>
                <td style={padding}>
                  <Link to={`/users/${user.id}`}>
                    {user.name}
                  </Link>
                </td>
                <td style={padding}>
                  {user.blogs.length}
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </>
  )
}

const Table = styled.table`
  background: rgb(232, 222, 222);
  padding: 2rem;
  margin: auto;
  border-radius: 5rem;

  & a {
    color: rgb(114, 114, 114);
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: blue;
      text-shadow: 0 0 1px rgba(244, 249, 246, 0.92);
    }
  }
`

export default Users
