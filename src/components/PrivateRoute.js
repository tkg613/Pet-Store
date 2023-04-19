import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'

const PrivateRoute = () => {

  const {loggedIn} = useAuthStatus()
  // console.log(loggedIn)

  if (loggedIn){
    return <Outlet />
  } else {
    return <Navigate to='/sign-in' />
  }
}

export default PrivateRoute