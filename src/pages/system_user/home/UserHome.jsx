import React, { useContext } from 'react'
import { UserContext } from '../../../components/context/UserContext'

export default function UserHome() {
       const {user } = useContext(UserContext) // user context
       console.log(user)
  return (
    <div>
        <h4>Welcome</h4>
        <h1>{user?.username}</h1>
        <h4>{user?.email}</h4>
        <h4>Role: {user?.role}</h4>
        <p>UserId: {user?._id}</p>
    </div>
  )
}
