import React from 'react'
import { Link } from 'react-router-dom'

const Explore = () => {
  return (
    <div>
      <header className='exploreHeader'>
        <h1>Explore</h1>
      </header>

      <main>

        <div className='categoryWrapper'>

          <div className='category mammalCategory'>
            <img 
              src='https://images.unsplash.com/photo-1444212477490-ca407925329e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZG9nc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
              alt='mammal'
              className='categoryImage'
            />
            <Link to='/mammals' className='categoryLink'>Mammals</Link>
          </div>

          <div className='category reptileCategory'>
            <img 
              src='https://images.unsplash.com/photo-1569462529461-9d84b52954d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHJlcHRpbGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
              alt='reptiles'
              className='categoryImage'
            />  
            <Link to='/reptiles' className='categoryLink'>Reptiles</Link>
          </div>

          <div className='category amphibianCategory'>
            <img 
              src='https://images.unsplash.com/photo-1613355398841-4d956786806f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFtcGhpYmlhbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
              alt='amphibian'
              className='categoryImage'
            />  
            <Link to='/amphibians' className='categoryLink'>Amphibians</Link>
          </div>
          <div className='category birdCategory'>
            <img
              src='https://images.unsplash.com/photo-1549608276-5786777e6587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YmlyZHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
              alt='birds'
              className='categoryImage'
            />  
            <Link to='/birds' className='categoryLink'>Birds</Link>
          </div>
          <div className='category fishCategory'>
            <img
              src='https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZmlzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
              alt='fish'
              className='categoryImage'
            />  
            <Link to='/fish' className='categoryLink'>Fish</Link>
          </div>
        </div>
        
      </main>
    </div>
  )
}

export default Explore