import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase.config'
import {toast} from 'react-toastify'
import {AiOutlineMail, AiFillLock, AiFillEye} from 'react-icons/ai'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'

const SignIn = () => {

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {email, password} = formData

  const onChange = function(e){
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async function(e){
    
    e.preventDefault()

    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      if (userCredential.user){
        navigate('/')
      }
      
    } catch(err){
      toast.error('Something went wrong.')
      console.log(err)
    }

  }

  return (
    <>

    <header>
      <h1 className='signInHeader'>Sign In</h1>
    </header>

      <form onSubmit={onSubmit}>

        <div className='emailInput'>
          <AiOutlineMail className='signInIcon'/>
          <input 
            type='text' 
            id='email' 
            value={email} 
            onChange={onChange} 
            autoComplete='off'
            placeholder='Email'
            className='signInInput'
          />
        </div>

        <div className='passwordInput'>
          <AiFillLock className='signInIcon'/>
          <input 
            type={showPassword ? 'text' : 'password'}
            id='password' 
            value={password} 
            onChange={onChange}
            autoComplete='off' 
            placeholder='Password'
            className='signInInput'
          />
          <AiFillEye 
            onClick={() => setShowPassword((prevState) => !prevState)} 
            className='eyeIcon'
          />
        </div>

        <div className='signInButtonDiv'>
          <p className='signInP'>Sign In</p>
          <button type='submit' className='signInButton'>
            <BsFillArrowRightCircleFill className='signInArrow' />
          </button>
        </div>

        <Link to='/forgot-password' className='forgotPasswordLink'>
          Forgot Password
        </Link>

        <Link to='/sign-up' className='orSignUp'>
          Or Sign Up
        </Link>

      </form>
    </>
  )
}

export default SignIn