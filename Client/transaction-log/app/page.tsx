"use client"

import React, {useEffect, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { useTransaction } from './comp/TransactionContext';
import { ILogs } from './comp/Types';
import BarChart from './comp/BarChart';




export default function Home() {


  const context = useTransaction();

  if (!context) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }

  const { transactions, fetchData } = context;

  const [tr, setTR] = useState<ILogs[] | []>([]);
  const [category, setCategory] = useState([0,0,0,0,0,0,0,0,0]);


  let data: any;
    //console.log(1111, transactions[0]?.summary.monthSpending)
    //console.log(1111, transactions)

  useEffect(() => {
    
    calCategorySpending()
  }, [transactions])
  



  let catrogyMap:{[month: string]: number} = {
    "FoodDrink":0,
    "Shopping":1,
    "Gaming":2,
    "Grocery":3,
    "Activity":4,
    "Subscription":5,
    "Transportation":6,
    "Electronics":7,
    "Other":8,
  }


  const calCategorySpending = () => {
    let tempCategory = category
    if (transactions && transactions[0]) {
      for (let i = 0; i < transactions[0].transaction.length; i++) {
        let curCaterogy = transactions[0].transaction[i].category
        let curPrice = transactions[0].transaction[i].price
        let curAmount = transactions[0].transaction[i].amount

        if (curCaterogy in catrogyMap) {
          console.log(2222, catrogyMap[transactions[0].transaction[i].category])
          tempCategory[catrogyMap[transactions[0].transaction[i].category]] += curPrice * curAmount
        } else {
          tempCategory[8] += curPrice * curAmount
        }
    
      }

      setCategory(tempCategory)
    }

  }



    ChartJS.register(ArcElement, Tooltip, Legend);
     data = {
      labels: ['Food & Drink', 'Shopping', 'Gaming', 'Grocery', 'Activity', 'Subscription', 'Transportation', 'Electronics', 'Other'],
      datasets: [
        {
          label: 'Category Spending',
          data: category,
          backgroundColor: [
            'rgba(255, 209, 220, 0.2)',
            'rgba(255, 182, 193, 0.2)',
            'rgba(255, 192, 203, 0.2)',
            'rgba(255, 218, 185, 0.2)',
            'rgba(255, 236, 179, 0.2)',
            'rgba(255, 228, 181, 0.2)',
            'rgba(176, 224, 230, 0.2)',
            'rgba(173, 216, 230, 0.2)',
            'rgba(193, 205, 205, 0.2)'
          ],
          borderColor: [
            'rgba(255, 209, 220, 1)',
            'rgba(255, 182, 193, 1)',
            'rgba(255, 192, 203, 1)',
            'rgba(255, 218, 185, 1)',
            'rgba(255, 236, 179, 1)',
            'rgba(255, 228, 181, 1)',
            'rgba(176, 224, 230, 1)',
            'rgba(173, 216, 230, 1)',
            'rgba(193, 205, 205, 1)'
          ],
          borderWidth: 1,
        },
      ],
    };
  



useEffect(() => {
  if (transactions) {
    let sortedTransactions = transactions[0]?.transaction.sort((a, b) => b.price - a.price);
    if (sortedTransactions?.length > 5) {
      sortedTransactions = sortedTransactions.slice(0, 5);
    }
    //console.log(2222, sortedTransactions)
    console.log(transactions)

    setTR(sortedTransactions)
  }
}, [transactions])




  return (
    <main className="flex flex-col min-h-screen w-full">
      <div className='flex w-full h-full mt-5'>
        <div className='ml-8 w-full h-5/6	 rounded-lg'>
            <Pie data={data} />
        </div>
        <div className='w-full h-1/2 mx-8 rounded-lg'>
            <h1 className='font-black text-4xl my-4 mx-4'>Top Items</h1>

            <div className='w-11/12'>
              {tr? tr.map((i, key) => {
                return (
                  <div className='flex border-2 border-black	 rounded-lg items-center my-2 h-8'>
                    <h1 className='w-1/4 ml-4 font-bold'>{tr[key]?.name}</h1>
                    <h1 className='ml-4  w-1/4'>x{tr[key]?.amount}</h1>  
                    <h1 className='ml-4  w-1/4'>${tr[key]?.price}</h1>  
                    <h1 className='ml-4  w-1/4'>{tr[key]?.category}</h1>  
                    <h1 className='ml-4  w-1/4'>{tr[key]?.date}</h1>  
                  </div>)
              }) : ""}
            </div>
        </div>
      </div>

      <div className='bg-white w-full h-full'>
              <BarChart/>
      </div>
  </main>
  );
}
