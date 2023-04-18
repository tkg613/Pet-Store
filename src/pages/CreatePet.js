import React from 'react'
import { useState, useEffect } from 'react'
import {auth} from '../firebase.config'
import { onAuthStateChanged } from 'firebase/auth'
import { serverTimestamp, addDoc, collection } from 'firebase/firestore'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { db } from '../firebase.config'
import {v4 as uuidv4} from 'uuid'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const CreatePet = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    age: 0,
    gender: 'male',
    images: {},
    price: 0,
    type: 'mammals',
  })

  const {name, age, gender, price, type, images} = formData

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({...formData, userRef: user.uid})
      } else {
        navigate('/sign-in')
      }
    })
  }, [auth, navigate])

  const onChange = function(e) {

    if (e.target.files){
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files
      }))
    } 

    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value
      }))
    }
  }

  const onSubmit = async function(e) {
    e.preventDefault()

    // Store images
    const storeImage = async function(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage()
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
        const storageRef = ref(storage, 'images/' + fileName)
        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );

      })
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false)
      toast.error('Images not uploaded')
      return
    })

    const formDataCopy = {
      ...formData,
      imgUrls: imgUrls,
      timestamp: serverTimestamp()
    }

    delete formDataCopy.images

    const docRef = await addDoc(collection(db, 'pets'), formDataCopy)

    setLoading(false)

    toast.success('Pet has been posted for sale')
    navigate(`/category/${formDataCopy.type}/${docRef.id}`)

  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <header className='formHeader'>
        <h1>Post pet for sale</h1>
      </header>

      <div className='formWrapper'>
        <form onSubmit={onSubmit}>
          <div>

            <div className='formInput formName'>
              <label htmlFor='name'>Name: </label>
              <input 
                type='text' 
                id='name' 
                value={name} 
                onChange={onChange} 
                autoComplete='off'
                placeholder='e.g., Golden retriever'
              />
            </div>

            <div className='formAge'>
              <label htmlFor='age'>Age: </label>
              <input 
                type='number' 
                id='age' 
                value={age} 
                onChange={onChange} 
                autoComplete='off'
                placeholder='Age'
                min='0'
              />
            </div>
            
            <div className='formGender'>
              <select
                id='gender'
                value={gender}
                onChange={onChange}
              >
                <option value='gender'>Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='none'>None</option>
              </select>
            </div>
            
            <div className='formType'>
              <select
                id='type'
                value={type}
                onChange={onChange}
              >
                <option value='type'>Type</option>
                <option value='mammal'>Mammal</option>
                <option value='reptile'>Reptile</option>
                <option value='amphibian'>Amphibian</option>
                <option value='bird'>Bird</option>
                <option value='fish'>Fish</option>
              </select>
            </div>
            
            <div className='formPrice'>
              <label htmlFor='price'>Price: $</label>
              <input 
                type='number' 
                id='price' 
                value={price} 
                onChange={onChange} 
                autoComplete='off'
                placeholder='Price'
                min='1'
              />
            </div>
            
            <div className='formImageUpload'>
              <label htmlFor='images'>Upload up to 6 images: </label>
              <input 
                type='file' 
                id='images' 
                onChange={onChange} 
                max='6'
                multiple
                required
                accept='.jpg,.png,.jpeg'
                style={{display: 'block'}}
              />
            </div>
          </div>

          <button type='submit' className='formBtn'>
            Add pet for sale
          </button>

        </form>

      </div>
    </>
  )
}

export default CreatePet