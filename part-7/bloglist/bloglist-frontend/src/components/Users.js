import React from 'react'

import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom'

import Notification from './Notification'
import Login from './Login'

const Users = ({users}) => {

  const padding = {
    paddingRight: 20
  }

  return (
    <div>
      <div>
        <h1>Blogs App</h1>
        <Notification />
        <Login />
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
    </div>
  )
}

export default Users
