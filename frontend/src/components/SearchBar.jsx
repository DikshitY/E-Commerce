import React from 'react'
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className='flex items-center w-full bg-slate-200 rounded-xl py-2 px-4 gap-4'>
        <FiSearch className='text-slate-600 text-lg'/>
        <input type="text" placeholder='Search for products' className='w-full bg-transparent focus:outline-none text-[18px]'/>
    </div>
  )
}

export default SearchBar