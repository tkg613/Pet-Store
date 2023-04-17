import React from 'react'
import {auth} from '../firebase.config'
import { useState, useEffect } from 'react'

const Profile = () => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(auth.currentUser)
  }, [])

  return user ? <h1>{user.displayName}</h1> : 'Not logged in'
}

export default Profile