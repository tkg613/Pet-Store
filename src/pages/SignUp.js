import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {auth} from '../firebase.config'
import {db} from '../firebase.config'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {toast} from 'react-toastify'
import {AiOutlineMail, AiFillLock, AiFillEye} from 'react-icons/ai'
import {BsFillArrowRightCircleFill, BsFillPersonFill} from 'react-icons/bs'


const SignUp = () => {

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })

  const {email, password, name} = formData

  const onChange = function(e){
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  
  const onSubmit = async function(e){
    
    e.preventDefault()

    try{
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name
      })

      // Save signed-up user to database
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch(err){
      toast.error('Something went wrong.')
      console.log(err)
    }

  }

  return (
    <>

    <header>
      <h1 className='signInHeader'>Sign Up</h1>
    </header>

      <form onSubmit={onSubmit}>

        <div className='nameInput'>
          <BsFillPersonFill className='signInIcon'/>
          <input 
            type='text' 
            id='name' 
            value={name} 
            onChange={onChange} 
            autoComplete='off'
            placeholder='Name'
            className='signInInput'
          />
        </div>

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
          <p className='signInP'>Sign Up</p>
          <button type='submit' className='signInButton'>
            <BsFillArrowRightCircleFill className='signInArrow' />
          </button>
        </div>

        <Link to='/forgot-password' className='forgotPasswordLink'>
          Forgot Password
        </Link>

        <Link to='/sign-in' className='orSignUp'>
          Or Sign In
        </Link>

      </form>
    </>
  )
}

export default SignUp