import React from 'react'
import {auth} from '../firebase.config'
import {collection, getDocs, query, where, orderBy} from 'firebase/firestore'
import { db } from '../firebase.config'
import { useState, useEffect } from 'react'
import {AiOutlineMail, AiOutlineLogout} from 'react-icons/ai'
import {BsFillPersonFill} from 'react-icons/bs'
import { useNavigate, Link } from 'react-router-dom'


const Profile = () => {

  const [loading, setLoading] = useState(true)
  const [pets, setPets] = useState(null)

  const [formData, setformData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const {name, email} = formData

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserPets = async function() {
      const petRef = collection(db, 'pets')
      const q = query(petRef, where('userRef', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'))
      const querySnap = await getDocs(q)

      const pets = []
      
      querySnap.forEach((doc) => {
        return pets.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setPets(pets)
      setLoading(false)
    }

    fetchUserPets()

  }, [auth.currentUser.uid])

  const onLogout = function(e) {
    e.preventDefault()
    auth.signOut()
    navigate('/sign-in')
  }

  return (
    <div>
      <header className='profileHeader'>
        <h1>My Profile</h1>
      </header>

      <div className='profileInfoDiv'>
        <div className='profileName'>
          <BsFillPersonFill className='profilePageIcon'/>
          <p>{name}</p>
        </div>
        <hr/>

        <div className='profileEmail'>
          <AiOutlineMail className='profilePageIcon'/>
          <p>{email}</p>
        </div>
        <hr/>

        {!loading && pets?.length > 0 && (
          <div className='userPetSaleDiv'>
            <p>Your pet(s) for sale:</p>
            <ul>
              {pets.map((pet, index) => (
                <div key={index} className='userPetSaleImgDiv'>
                  <img 
                    src={pet.data.imgUrls[0]} 
                    alt='user pet image'  
                  />
                  <li>{pet.data.name}</li>
                  <hr/>
                </div>
              ))}
            </ul>
          </div>
        )}

        <div className='profileCreatePet'>
          <Link to='/create-pet' className='createPetLink'>
            Post pet for sale
          </Link>
        </div>

        <div className='profileLogout'>
          <p>Log out</p>
          <AiOutlineLogout  
            className='logoutIcon'
            cursor='pointer'
            onClick={onLogout}
          />
        </div>
      </div>

    </div>
  )
}

export default Profile