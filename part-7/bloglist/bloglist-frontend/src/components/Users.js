import React from 'react'
import { useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom'

import Notification from './Notification'

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
      <table>
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
      </table>
    </>
  )
}

export default Users
