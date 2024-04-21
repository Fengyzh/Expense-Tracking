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
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8080');
          setTransactions(response.data); 
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
      };
   
      fetchData();
    }, []);
  
    return (
      <TransactionContext.Provider value={transaction}>
        {children}
      </TransactionContext.Provider>
    );
  };
  
  // Custom hook to consume the transaction context
  export const useTransaction = () => useContext(TransactionContext);
