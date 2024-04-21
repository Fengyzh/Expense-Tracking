"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ILogs } from './Types';

interface ITransactionPackage {
    year: string,
    transaction: ILogs[]
 }
 

 interface Props {
    children: React.ReactNode
}

const TransactionContext = createContext<ITransactionPackage[]>([]);
  
  export const TransactionProvider = ({ children }: Props) => {
    const [transaction, setTransactions] = useState<ITransactionPackage[]>([]);

    useEffect(() => {
      try {
        axios.get('http://localhost:8080').then((res)=>{
          setTransactions(res.data); 
          console.log(res.data)
      });
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    }, []);
  
    return (
      <TransactionContext.Provider value={transaction}>
        {children}
      </TransactionContext.Provider>
    );
  };
  
  // Custom hook to consume the transaction context
  export const useTransaction = () => useContext(TransactionContext);
