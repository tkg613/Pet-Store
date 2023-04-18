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
            <Link to='/category/mammal' className='categoryLink'>
              <img 
                src='https://images.unsplash.com/photo-1444212477490-ca407925329e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZG9nc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
                alt='mammal'
                className='categoryImage'
              />
            <p>Mammals</p>
            </Link>
          </div>

          <div className='category reptileCategory'>
            <Link to='/category/reptile' className='categoryLink'>
              <img 
                src='https://images.unsplash.com/photo-1569462529461-9d84b52954d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHJlcHRpbGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
                alt='reptiles'
                className='categoryImage'
              />  
            <p>Reptiles</p>
            </Link>
          </div>

          <div className='category amphibianCategory'>
            <Link to='/category/amphibian' className='categoryLink'>
              <img 
                src='https://images.unsplash.com/photo-1613355398841-4d956786806f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFtcGhpYmlhbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
                alt='amphibian'
                className='categoryImage'
              />  
              <p>Amphibians</p>
            </Link>
          </div>
          <div className='category birdCategory'>
            <Link to='/category/bird' className='categoryLink'>
              <img
                src='https://images.unsplash.com/photo-1549608276-5786777e6587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YmlyZHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
                alt='birds'
                className='categoryImage'
              />  
              <p>Birds</p>
            </Link>
          </div>
          <div className='category fishCategory'>
          <Link to='/category/fish' className='categoryLink'>
              <img
                src='https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZmlzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
                alt='fish'
                className='categoryImage'
              />  
              <p>Fish</p>
            </Link>
          </div>
        </div>
        
      </main>
    </div>
  )
}

export default Explore