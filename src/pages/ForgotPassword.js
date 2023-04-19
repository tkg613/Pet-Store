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
    <>

      <header className='forgotPasswordHeader'>
        <h1>Forgot Password</h1>
      </header>

      <div className='passwordResetContainer'>

        <div className='passwordResetDiv'>
          <form onSubmit={onSubmit}>

              <p>Send password reset email to:</p>
              <div className='passwordResetEmailField'>

                <input 
                  type='text' 
                  id='email'
                  value={email} 
                  onChange={onChange}
                  className='passwordResetInput'
                />

                <button type='submit' className='passwordResetBtn'>
                <BsFillArrowRightCircleFill className='passwordResetIcon'/>
                </button>
              </div>
              
          </form>
          
        </div>

        <div className='passwordResetLink'>
          <Link to='/sign-in'>Sign In</Link>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword