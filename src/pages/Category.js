import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore'
import { db } from '../firebase.config'
import {toast} from 'react-toastify'

const Category = () => {

  const {categoryName} = useParams()

  const [pets, setPets] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    
    const fetchPets = async function(){
      try {
        setLoading(true)
        // Get reference
        const petsRef = collection(db, 'pets')

        // Create query
        const q = query(petsRef, where('type', '==', categoryName), orderBy('timestamp', 'desc'), limit(10))
      
        // Execute query
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

      } catch(err) {
        setLoading(false)
        console.log(err)
        toast.error('Could not fetch pets.')
      }
    }

    fetchPets()

  }, [])

  if (loading) {
    return <p>Loading...</p> // show loading message while fetching data
  }

  if (!pets) {
    return <p>No pets found.</p> // show message if no pets are found
  }


  return (
    <>
      <header>
        <h1 className='categoryHeader'>{categoryName}</h1>
      </header>

      <main>
        {pets && pets.map((pet) => (
            <div className='petInfoWrapper' key={pet.id}>
              <div className='petInfoImage'>
                <img 
                  src={pet.data.imgUrls[0]} 
                  alt='pet image'
                  height='300px'
                  width='300px'
                  style={{borderRadius: '7px'}}
                 />
              </div>
              
              <div className='petInfo'>

                <div className='petInfoParagraph petInfoName'>
                  <p>{pet.data.name}</p>
                </div>

                <div className='petInfoParagraph petInfoGender'>
                  {pet.data.gender}
                </div>

                <div className='petInfoParagraph petInfoAge'>
                  <p>Age: {pet.data.age} year(s) old</p>
                </div>
                
                <div className='petInfoParagraph petInfoPrice'>
                  <p>Price: ${pet.data.price}</p>
                </div>
                
                <Link to={`/category/${categoryName}/${pet.id}`} className="petInfoLink">
                  <button type='button'>Details</button>
                </Link>
              </div>
            </div>
        ))}
      </main>
    </>
  )
}

export default Category