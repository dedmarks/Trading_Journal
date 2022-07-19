import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {db} from './firebase'
import { useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
  );

function Chart() {

    const { user } = useSelector((state) => state.trade);
    const[tardeBalance, setTradeBalance]= useState([])


    useEffect(() => {
      try{
        db.collection('users').doc(user?.uid).collection('tradeBalance').orderBy('created', 'asc')
        .onSnapshot((querySnapshot) => (
          setTradeBalance(querySnapshot.docs.map(doc => (
            doc.data()
          )))
        ))
    }catch(err){
        alert(err)
    }
     
    },[user])

    const labels= tardeBalance.map(item => item.profit)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Profits/trade',
      },
    },
    scales: {
      yAxes:{
          grid: {
              drawBorder: true,
              color: '#909692',
          },
          ticks:{
              beginAtZero: true,
              color: '#909692',
              fontSize: 12,
          }
      },
      xAxes: {
          grid: {
              drawBorder: true,
              color: 'rgba(217, 82, 0, 0)',
          },
          ticks:{
              beginAtZero: true,
              color: '#909692',
              fontSize: 12,
          }
      },
  }
  };
  

  const data = {
    
    labels,
    datasets: [
      {
        label: '',
        data: tardeBalance.map((item)=> (item.profit)),
        borderColor: 'rgb(255, 82, 0',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return (
    <Line options={options} data={data} />
    )
}

export default Chart