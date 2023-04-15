import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {MdOutlineExplore} from 'react-icons/md'
import {CgProfile} from 'react-icons/cg'

const Navbar = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const pathMatchRoute = function(route){
    if (route === location.pathname){
      return true
    }
  }

  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
          <li className='navbarListItem' onClick={() => navigate('/')}>
            <MdOutlineExplore className='exploreIcon'/>
            <p className={pathMatchRoute('/') ? 'navbarIconNameActive' : 'navbarIconName'}>Explore</p>
          </li>
          <li className={pathMatchRoute('/profile') ? 'navbarIconNameActive' : 'navbarIconName'} onClick={() => navigate('/profile')}>
            <CgProfile className='profileIcon'/>
            <p className='navbarIconName'>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Navbar