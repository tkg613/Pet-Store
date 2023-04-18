import React from 'react'
import {auth} from '../firebase.config'

import { useState } from 'react'
import {AiOutlineMail, AiOutlineLogout, AiOutlinePlusCircle} from 'react-icons/ai'
import {BsFillPersonFill} from 'react-icons/bs'
import { useNavigate, Link } from 'react-router-dom'


const Profile = () => {


  const [formData, setformData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const {name, email} = formData

  const navigate = useNavigate()

  const onLogout = function(e) {
    e.preventDefault()
    auth.signOut()
    navigate('/sign-in')
  }

  return (
    <div>
      <header className='profileHeader'>
        <h1 style={{color: '#FF6D60'}}>My Profile</h1>
      </header>

      <div className='profileInfoDiv'>
        <div className='profileName'>
          <BsFillPersonFill fill='#FF6D60' className='profilePageIcon'/>
          <p>{name}</p>
        </div>

        <div className='profileEmail'>
          <AiOutlineMail fill='#FF6D60' className='profilePageIcon'/>
          <p>{email}</p>
        </div>

        <div className='profileCreatePet'>
          <Link to='/create-pet' className='createPetLink'>
            <AiOutlinePlusCircle fill='#A84448' className='createPetIcon'/>
            Post pet for sale
          </Link>
        </div>

        <div className='profileLogout'>
          <p>Log out</p>
          <AiOutlineLogout 
            fill='#FF6D60' 
            className='profilePageIcon'
            cursor='pointer'
            onClick={onLogout}
          />
        </div>
      </div>

    </div>
  )
}

export default Profile