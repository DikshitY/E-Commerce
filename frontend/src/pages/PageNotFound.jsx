import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='pt-16 pb-24 h-screen flex flex-col justify-center items-center'>
        <h1 className='text-7xl font-bold'>404</h1>
        <h3 className='text-4xl mb-8'>Oop! Page not found.</h3>
        <Link to={'/'} className='border-2 border-black py-1 px-4 rounded-lg'>Back to home</Link>
    </div>
  )
}

export default PageNotFound