import React from 'react'
import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {getDoc, doc} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import {auth} from '../firebase.config'
import {AiFillCopy} from 'react-icons/ai'

const Pet = () => {

  const [pet, setPet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  const navigate = useNavigate()
  const {petId} = useParams()

  useEffect(() => {
    const fetchPet = async function() {
      
      const docRef = doc(db, 'pets', petId)
      const docSnap = await getDoc(docRef)

      console.log('Hi')

      if (docSnap.exists()){
        console.log(docSnap.data())
        setPet(docSnap.data())
        setLoading(false)
      }
    }

    fetchPet()

  }, [navigate, petId])

  if (loading){
    return <h3>Loading...</h3>
  }

  return (
    <>

      <header className='petHeader'>
        <h1>{pet.name}</h1>
      </header>

      <main>
        <div className='shareIconDiv' onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          setShareLinkCopied(true)
          setTimeout(() => {
            setShareLinkCopied(false)
          }, 2000)
        }}>
          <p>Copy link to clipboard</p>
          <AiFillCopy fill='#A84448'/>
        </div>
        {shareLinkCopied && <p className='linkCopiedText'>Link copied to clipboard.</p>}
      </main>
    </>
  )
}

export default Pet