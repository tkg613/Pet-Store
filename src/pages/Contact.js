import React from 'react'
import {useState, useEffect} from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import {doc, getDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'

const Contact = () => {

  const [message, setMessage] = useState('')
  const [owner, setOwner] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const {ownerId} = useParams()

  useEffect(() => {

    const fetchOwner = async function(){
      const docRef = doc(db, 'users', ownerId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()){
        setOwner(docSnap.data())
      } else {
        toast.error('Could not get owner data')
      }

    }

    fetchOwner()

  }, [ownerId])

  const onChange = function(e) {
    setMessage(e.target.value)
  }

  return (
    <div>
      <header>
        <h1>Contact Owner</h1>
      </header>

      {owner !== null && (
        <main>
          <div>
            <p>Contact {owner?.name}</p>
          </div>
          <form>
            <div>
              <label htmlFor='message'>Message</label>
              <textarea name='message' id='message' value={message} onChange={onChange}></textarea>
            </div>

            <a href={`mailto: ${owner.email}?Subject=${searchParams.get('petName')}&body=${message}`}>
              <button type='button'>
                Send Message
              </button>
            </a>

          </form>
        </main>
      )}

    </div>
  )
}

export default Contact