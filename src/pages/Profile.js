import React from 'react'
import {auth} from '../firebase.config'
import {collection, getDocs, query, where, orderBy, doc, deleteDoc} from 'firebase/firestore'
import { db } from '../firebase.config'
import { useState, useEffect } from 'react'
import {AiOutlineMail, AiOutlineLogout, AiOutlinePlusCircle} from 'react-icons/ai'
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

  console.log(pets)

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

        {!loading && pets?.length > 0 && (
          <>
            <p>Your pets for sale</p>
            <ul>
              {pets.map((pet, index) => (
                <li key={index}>{pet.data.name}</li>
              ))}
            </ul>
          </>
        )}

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