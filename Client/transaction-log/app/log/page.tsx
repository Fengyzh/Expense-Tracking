"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import YearLogs from './YearLogs'
import { ILogs } from '../comp/Types'

export default function Log() {

 interface ITransactionPackage {
    year: string,
    transaction: ILogs[]
 }


  const [data, setData] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080").then((res)=>{
      setData(res.data)
      console.log(res.data)
      console.log(res.data[0].transaction)
    })
  

  }, [])
  




  return (
    <div className='h-full w-full'>
 
        

        {data.map((items:ITransactionPackage, key)=> {
          return  (
          <div>
            <h1 className='m-8 text-8xl font-extrabold'>{items.year}</h1>
            <YearLogs key={key} data={items.transaction}/>
            </div>
          )})}

    </div>
  )
}
