"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ILogs, ITransactionPackage } from './Types';


interface ITransactionContext {
  transactions: ITransactionPackage[];
  curTransaction: ILogs | undefined;
  setCurTransaction: React.Dispatch<React.SetStateAction<ILogs | undefined>>;
  deleteTransaction: (id: number) => void;
  fetchData: () => void;
}

 interface Props {
  children: React.ReactNode
}


const TransactionContext = createContext<ITransactionContext | null>(null);
  
  export const TransactionProvider = ({ children }: Props) => {
    const [transactions, setTransactions] = useState<ITransactionPackage[]>([]);
    const [curTransaction, setCurTransaction] = useState<ILogs>();


    const fetchData = () => {
      try {
        axios.get('http://localhost:8080').then((res)=>{
          setTransactions(res.data); 
          //console.log(res.data)
      });
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    }

    useEffect(() => {
      fetchData()
    }, []);
  

    const deleteTransaction = (id:number) => {
      try {
        axios.post('http://localhost:8080/delete', id, {    
          headers: {
          'Content-Type': 'application/json'
      }}).then(()=>{
          console.log('Delete complete')
          fetchData()
      });
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }

    }


    return (
      <TransactionContext.Provider value={{transactions, curTransaction, setCurTransaction, deleteTransaction, fetchData}}>
        {children}
      </TransactionContext.Provider>
    );
  };
  
  // Custom hook to consume the transaction context
  export const useTransaction = () => useContext(TransactionContext);
