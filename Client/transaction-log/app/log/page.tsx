"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import YearLogs from './YearLogs'
import { ILogs } from '../comp/Types'
import { useTransaction } from '../comp/TransactionContext'


export default function Log() {

 interface ITransactionPackage {
    year: string,
    transaction: ILogs[]
 }

  const transactions = useTransaction();
  

  return (
    <div className='h-full w-full'>
 
        {transactions.map((items:ITransactionPackage, key)=> {
          return  (
          <div key={key}>
            <h1 className='m-8 text-8xl font-extrabold'>{items.year}</h1>
              <YearLogs data={items.transaction}/>
            </div>
          )})}

    </div>
  )
}
