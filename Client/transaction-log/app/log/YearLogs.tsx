import React from 'react'
import { ILogs } from '../comp/Types'
import { useTransaction } from '../comp/TransactionContext';
 
 interface YearLogsProps {
    data: ILogs[];
  }

export default function YearLogs({data}:YearLogsProps) {

  const context = useTransaction();

  if (!context) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }

  const { curTransaction, setCurTransaction } = context;


    const maxHeight = 'max-h-8'

     const expandEntry = (e:React.MouseEvent) => {
        let classNames = e.currentTarget.classList
        if (classNames.contains(maxHeight)) {
          e.currentTarget.classList.replace(maxHeight, 'max-h-full')
        } else {
          e.currentTarget.classList.replace('max-h-full', maxHeight)
    
        }
      }

  const handleEdit = (i:number) => {

    setCurTransaction(data[i])
  }



  return (
    <div>

        {data.map((entry:ILogs, key)=> {
          return (
          <div className='flex items-center group' key={key}>
            <div className='flex log-entry-cont max-h-8 rounded-lg border-gray-950 border-2 leading-7 ml-12 mr-6 w-9/12 flex-wrap overflow-hidden px-5 transition-all duration-300 mb-2 ' 
            onClick={(e)=> expandEntry(e)}>
                      <div className='w-1/5'>
                        <h1>Item: {entry.name}</h1>
                      </div>
                      <div className='w-1/5'>
                        <h1>Date: {entry.date}</h1>
                      </div>
                      <div className='w-1/5'>
                        <h1>Category: {entry.category}</h1>
                      </div>
                      <div className='w-1/5'>
                        <h1>Amount: {entry.amount}</h1>
                      </div>
                      <div className='w-1/5'>
                        <h1>Price: ${entry.price}</h1>
                      </div>
                      <div className='w-full'>
                        <h1>Purpose: {entry.purpose}</h1>
                      </div>
                      <div className='w-full'>
                        <h1>Note: {entry.note}</h1>
                      </div>
                      <div className='w-full'>
                        <h1>Store: {entry.store_name?.store_name}</h1>
                      </div>
                  </div>
                  <button className='border-2 leading-7 rounded-lg mb-2 px-4 group-hover:opacity-100 opacity-0 transition-all duration-300 bg-green-400 text-white border-white' onClick={()=>handleEdit(key)}>Edit</button>
                  <button className='border-2 leading-7 rounded-lg ml-4 mb-2 px-4 bg-red-400 group-hover:opacity-100 opacity-0 transition-all duration-300 border-white'>Delete</button>

                </div>)
        })}


    </div>
  )
}
