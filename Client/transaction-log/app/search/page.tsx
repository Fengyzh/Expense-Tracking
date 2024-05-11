"use client"

import axios from 'axios';
import React, { useEffect, useRef, useState }from 'react'

export default function Search() {

  const [data, setData] = useState([]);


    const searchInput = useRef<HTMLInputElement>(null);


    const handleSearch = () => {
        console.log(searchInput?.current?.value)
        axios.post('http://localhost:8080/search', searchInput?.current?.value).then((res)=>{
          setData(res.data)
        console.log(res.data)}); 
    }


  return (
    <div className='h-full w-full'>
        <h1 className='text-center text-5xl font-bold mt-6'>Search</h1>
        <div className='w-full text-center mt-6'>
            <input ref={searchInput} className='border border-black w-3/4 px-4 rounded-md h-8' type='text' placeholder='Enter here'/>
            <button className='bg-green-400 px-4 h-8 rounded-md ml-6 text-white' onClick={()=>handleSearch()}>Search</button>
        </div>

        <div className='mt-8 text-center w-full'>
          {data.map((i:any, key) => {
            return <div className='flex justify-between mx-8 px-4 border mt-4'>
              {typeof i == "object" ?  i.map((j:any, k:number) => {
              return <p>{j}</p>
            }) : <div>{i}</div>}

            
            </div>
          })}

        </div>
    </div>
  )
}
