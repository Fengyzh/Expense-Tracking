"use client"

import React, { useRef }from 'react'

export default function Search() {
    const searchInput = useRef<HTMLInputElement>(null);


    const handleSearch = () => {
        console.log(searchInput?.current?.value)
    }


  return (
    <div className='h-full w-full'>
        <h1 className='text-center text-5xl font-bold mt-6'>Search</h1>
        <div className='w-full text-center mt-6'>
            <input ref={searchInput} className='border border-black w-3/4 px-4 rounded-md h-8' type='text' placeholder='Enter here'/>
            <button className='bg-green-400 px-4 h-8 rounded-md ml-6 text-white' onClick={()=>handleSearch()}>Search</button>
        </div>

        <div>


        </div>
    </div>
  )
}
