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
            <th>Users</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user =>
              <tr key={user.id}>
                <Td>
                  <Link to={`/users/${user.id}`}>
                    {user.name}
                  </Link>
                </Td>
                <Td>
                  {user.blogs.length}
                </Td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </>
  )
}

const Table = styled.table`
  background: rgb(175, 244, 253);
  border: thick double black;
  padding: 2rem;
  margin: 0 auto;
  min-width: 80%;
  min-height: 20rem;
  border-radius: 4rem;

  & a {
    color: black;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`

const Td = styled.td`
  text-align: center;
  width: 50%;
`

export default Users
