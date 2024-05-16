"use client"

import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Title, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTransaction } from '../comp/TransactionContext';



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


export default function BarChart() {


    const context = useTransaction();

    if (!context) {
      throw new Error('useTransaction must be used within a TransactionProvider');
    }
    const { transactions } = context;


        const styles = {
            backgroundColor:"white"
        }

        // Sample data
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const data = transactions[0]?.summary?.monthSpending;
      
        // Chart data
        const chartData = {
          labels: months,
          datasets: [
            {
              label: "Months",
              backgroundColor: 'rgb(74 222 128)',
              borderColor: 'rgba(255,255,255,1)',
              borderWidth: 1,
              data: data,
            },
          ],
        };
      
  
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: 'black', 
              },
            },
            y: {
              grid: {
                color: 'rgba(0,0,0,0.2)', 
              },
            },
          },        
          plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Monthly Spending',
          },
        },
      };
  


  return (
    <div className='w-full h-full'>
      <Bar style={styles}data={chartData} options={options}/>

    </div>
  )
}
