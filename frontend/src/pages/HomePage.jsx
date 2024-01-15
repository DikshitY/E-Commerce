import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const HomePage = () => {
  const user = useSelector(state => state.user.user)
  
  useEffect(() => {
    console.log(user);
  },[user])

  return (
    <div className='pt-16 pb-10'>HomePage</div>
  )
}

export default HomePage;