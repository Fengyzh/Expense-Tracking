"use client"

import React, {useEffect, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useTransaction } from './comp/TransactionContext';
import { ILogs } from './comp/Types';




export default function Home() {


  const context = useTransaction();

  if (!context) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }

  const { transactions, fetchData } = context;

  const [tr, setTR] = useState<ILogs[] | []>([]);

  let data: any;
  if (transactions) {
    //console.log(1111, transactions[0]?.summary.monthSpending)
    //console.log(1111, transactions)

    ChartJS.register(ArcElement, Tooltip, Legend);
     data = {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      datasets: [
        {
          label: '# of Votes',
          data: transactions[0]?.summary.monthSpending,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
}



useEffect(() => {
  if (transactions) {
    let sortedTransactions = transactions[0]?.transaction.sort((a, b) => b.price - a.price);
    if (sortedTransactions?.length > 5) {
      sortedTransactions = sortedTransactions.slice(0, 5);
    }
    console.log(2222, sortedTransactions)

    setTR(sortedTransactions)
  }
}, [transactions])




  return (
    <main className="flex min-h-screen w-full">
      <div className='flex w-full h-full mt-5'>
        <div className='border-4 ml-8 w-2/3 h-1/2'>
            <Pie data={data} />
        </div>
        <div className='border-4 w-full h-1/2 mx-8'>
            <h1 className='font-black text-4xl my-4'>Top Items</h1>

            {tr? tr.map((i, key) => {
              return <h1>{tr[key]?.name}</h1>
            }) : "mo"}

        </div>
      </div>
    </main>
  );
}
