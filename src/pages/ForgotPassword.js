import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {auth} from '../firebase.config'
import { sendPasswordResetEmail } from 'firebase/auth'
import {toast} from 'react-toastify'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'

const ForgotPassword = () => {

  console.log(toast)

  const [email, setEmail] = useState('')

  const onChange = function(e) {
    setEmail(e.target.value)
  }

  const onSubmit = async function() {
    try {
      await sendPasswordResetEmail(auth, email)
      toast.success('Password reset email has been sent.')
    } catch(err) {
      console.log(err)
      toast.error('Could not send password reset email.')
    }
  }

  return (
    <div className='passwordResetContainer'>
      <div className='passwordResetDiv'>
        <form onSubmit={onSubmit}>
          <div className='passwordResetInputGroup'>
            <input 
              type='text' 
              value={email} 
              onChange={onChange}
              className='passwordResetInput'
            />
            
            <button type='submit' className='passwordResetBtn'>
              <BsFillArrowRightCircleFill fill='#FF6D60' className='passwordResetIcon'/>
            </button>
          </div>
        </form>
        
      </div>

      <div className='passwordResetLink'>
        <Link to='/sign-in'>Sign In</Link>
      </div>
    </div>
  )
}

export default ForgotPassword