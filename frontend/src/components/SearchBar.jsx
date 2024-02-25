import React from 'react'
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { changeSearchTerm } from '../store';
import { filterSearch } from '../store';
import { useNavigate } from 'react-router';

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchTerm = useSelector((state) => state.searchTerm);

  const handleSearchChange = (e) => {
    dispatch(changeSearchTerm(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(filterSearch(searchTerm))
    navigate('products')
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center w-full bg-slate-100 rounded-xl py-2 px-4 gap-4 max-sm:py-1'>
        <FiSearch className='text-slate-600 text-lg max-sm:text-base'/>
        <input onChange={handleSearchChange} value={searchTerm} type="text" placeholder='Search for products' className='w-full bg-transparent focus:outline-none text-lg max-sm:text-base'/>
    </form>
  )
}

export default SearchBar