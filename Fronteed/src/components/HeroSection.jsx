import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query,setQuery]=useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler=()=>{
    dispatch(setSearchQuery(query)); // dispatch action to set search query in redux store
   navigate('/browse');
    // navigate to search page with query
  }
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10 '>
        <span className='px-4 mx-auto py-2 rounded-full font-medium bg-gray-100 text-[#F83002]'>No.1 Website for Job Hunt</span>
        <h1 className='text-5xl font-bold'>Search , Apply & <br/> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium est optio inventore commodi hic! Sequi?</p>
      <div className='flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
        <input 
        type="text"
        placeholder='Find Your Dream Jobs' 
        onChange={(e)=>setQuery(e.target.value)}
        className='outline-none border-none w-full'
        />
        <Button onClick={searchJobHandler} 
        className='rounded-r-full bg-[#6a38c2]'>
            <Search className='h-5 w-5'/>
        </Button>
      </div>
        </div>
       
    </div>
  )
}

export default HeroSection
