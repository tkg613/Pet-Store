import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../firebase.config'

export const useAuthStatus = function() {

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user){
        setLoggedIn(true)
      }
    })
  })

  return {loggedIn}

}