import React from 'react'
import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {getDoc, doc} from 'firebase/firestore'
import { db } from '../firebase.config'
import {auth} from '../firebase.config'
import {AiFillCopy} from 'react-icons/ai'
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

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
      <main>
        <div className='petInfoWrapper'>
          <div className='swiperWrapper'>
            <Swiper
              slidesPerView={1}
              pagination={{clickable: true}}
              className='petSwiper'
            >
              {pet.imgUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <div 
                    className='swiperSlideDiv'
                    style={{
                      background: `url(${pet.imgUrls[index]}) 
                      center no-repeat`,
                      backgroundSize: 'cover',
                      minHeight: '50rem'
                    }}  
                  >

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
            
          <div className='petDetailsWrapper'>
            <header className='petHeader'>
              <h1>{pet.name}</h1>
            </header>
            
            <div className='petDetails'>
              <p>Type: {pet.type}</p>
              <hr/>
              <p>{pet.gender}</p>
              <hr/>
              <p>Age: {pet.age}</p>
              <hr/>
              <p>Price: ${pet.price}</p>
              <hr/>
            </div>

            <div className='contactOwnerDiv'>
              {auth.currentUser?.uid !== pet.userRef && (
                <Link to={`/contact/${pet.userRef}?petName=${pet.name}`} className='contactLink'>
                  Contact owner
                </Link>
              )}
            </div>

            <div className='shareIconDiv' onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              setShareLinkCopied(true)
              setTimeout(() => {
                setShareLinkCopied(false)
              }, 2000)}}
            >
              <p>Copy link to clipboard</p>
              <AiFillCopy className='shareIcon'/>
            </div>
            {shareLinkCopied && <p className='linkCopiedText'>Link copied to clipboard.</p>}

          </div>

        </div>

      </main>
    </>
  )
}

export default Pet