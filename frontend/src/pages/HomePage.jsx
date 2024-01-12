import React from 'react'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const user = useSelector(state => state.user)
  console.log(user);
  
  return (
    <div className='pt-16 pb-10'>HomePage</div>
  )
}

export default HomePage