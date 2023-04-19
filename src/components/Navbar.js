import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {MdOutlineExplore} from 'react-icons/md'
import {BsFillPersonFill} from 'react-icons/bs'

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
            <MdOutlineExplore fill={pathMatchRoute('/') ? '#0EA293' : '#20262E'} className='exploreIcon'/>
            <p className={pathMatchRoute('/') ? 'navbarIconNameActive' : 'navbarIconName'}>Explore</p>
          </li>
          <li className='navbarListItem' onClick={() => navigate('/profile')}>
            <BsFillPersonFill fill={pathMatchRoute('/profile') ? '#0EA293' : '#20262E'} className='profileIcon'/>
            <p className={pathMatchRoute('/profile') ? 'navbarIconNameActive' : 'navbarIconName'}>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Navbar