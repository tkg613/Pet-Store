import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../firebase.config'

export const useAuthStatus = function() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user){
        setLoggedIn(true)
      }
      setLoading(false)
    })
  }, [])

  return {loggedIn, loading}

}