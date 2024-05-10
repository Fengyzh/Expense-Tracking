"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import YearLogs from './YearLogs'
import { ITransactionPackage } from '../comp/Types'
import { useTransaction } from '../comp/TransactionContext'


export default function Log() {


  const context = useTransaction();

  if (!context) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }

  const { transactions, fetchData } = context;
  console.log(transactions)
  
  useEffect(() => {
    fetchData()
  

  }, [])
  

  return (
    <div className='h-full w-full'>
        {transactions.map((items:ITransactionPackage, key:number)=> {
          return  (
          <div key={key}>
            <h1 className='m-8 text-8xl font-extrabold'>{items.year}</h1>
              <YearLogs data={items.transaction}/>
            </div>
          )})}

    </div>
  )
}
