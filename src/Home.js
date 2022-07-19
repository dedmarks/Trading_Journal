import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import "./Home.css"
import Trade from './Trade';
import Chart from './Chart';
import CalculatorPopup from './CalculatorPopup';
import Winrate from './Winrate';
import { Link } from 'react-router-dom'
import {db} from './firebase'
import axios from 'axios'
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
import Coins from './Coins';
import { auth } from './firebase';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
);

function Home() {

   const { tradeList  } = useSelector((state) => state.trade);
   const[calculatorPopupOpen, setCalculatorPopupOpen]= useState(false);
   const[tradee, setTradee]= useState([]);
   const [coins, setCoins]= useState([]);
   const[balList, setBalList]= useState([])

   const sortedTradeList= [...tradeList];
   sortedTradeList.sort((a,b)=> new Date(b.time)- new Date(a.time));

   const user = useSelector(state => state.trade.user)

   const handleAuthentication = () => {
     if(user){
         auth.signOut()
     }
 }
   useEffect(() => {
     axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(res => {
       setCoins(res.data);
     }).catch(error=> console.log(error))
   },[])

   useEffect(() => {
     try{
       db.collection('users').doc(user?.uid).collection('trades').orderBy('created', 'desc')
       .onSnapshot((querySnapshot) => (
         setTradee(querySnapshot.docs.map(doc => ({
           id: doc.id,
           data: doc.data()
         })))
       ))
       db.collection('users').doc(user?.uid).collection('balList').orderBy('created', 'asc')
       .onSnapshot((querySnapshot) => (
         setBalList(querySnapshot.docs.map(doc => (
           doc.data()
         )))
       ))
   }catch(err){
       alert(err)
   }
    
   },[user])

   
   
  //  const initialValue= 0
  //  const balanceList= tardeBalance.map((x) => parseInt(x.profit))
  //  const balance= balanceList.reduce((x,y) => x+y, initialValue)

   const balList1= balList.map(x => x.bal)

  //  console.log(balanceList)
  //  console.log(balList1)



 const options3 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Equity curve',
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
            color: 'rgba(217, 82, 0, 0)',
            fontSize: 12,
        }
    },
}
};

const labels = balList1;

 const data3 = {
  labels,
  datasets: [
    {
      fill: true,
      data: balList1.map(item => item),
      borderColor: 'rgb(255, 82, 0)',
      backgroundColor: 'rgba(217, 82, 0, 0.3)',
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};


   
  return (
    <div className="home">
      <div className="top__wraper">
        <div className='row'>
          <Link style={{textDecoration: 'none'}} to={!user && '/login'}>
          <div onClick={handleAuthentication} className='login__container'>
            <h2>Hello {user?.email}</h2>
            <h5>Sign {user ? 'Out' : 'In'}</h5>
          </div>  
          </Link>
          <button className='calc_btn' onClick={() => setCalculatorPopupOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-calculator-fill" viewBox="0 0 16 16">
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm2 .5v2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5zm0 4v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zM4.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM4 12.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zM7.5 6a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM7 9.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm.5 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM10 6.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm.5 2.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-1z"/>
            </svg>
          </button>
          <CalculatorPopup popupOpen={calculatorPopupOpen} setPopupOpen={setCalculatorPopupOpen}/>  
        </div>
        <div className='row'>
          <h3 className="trade__label">Trade List</h3> 
        </div>
        <div className='row3'>
        <div className="home__container">
          <div className="trades__container">
          <div className="home__lables">
              <h5 className="home__asset">Asset</h5>
              <h5 className="home__date">Date</h5>
              <h5 className="home__size">Size</h5>
              <h5 className="home__entry">Entry</h5>
              <h5 className="home__exit">Exit</h5>
              <h5 className="home__exit">Profit</h5>
              <h5 className="home__status">Status</h5>
              <h5 className="home__type">Type</h5>
              <h5 className="home__confluance">Confluance</h5>
          </div>
            {tradee && tradee.length > 0 ? 
            tradee.map((trade) => (
                <Trade
                trade={trade.data}
                />
            ))
            : 'no trades found'}
          </div>
        </div>
          <Winrate/>
          </div>
     </div>
     <h3 className="trade__label">Chart section</h3>
     <div className="chart__wrapper">
     <div className="chart__container">
       <Chart/>
     </div>
     <div className="chart__container">
          <Line options={options3} data={data3}/>
     </div>
     </div>
     <h3 className="trade__label">Markets</h3>
     <div className='coins__wrapper'>
     {coins.map(coin => {
      return(
      <Coins key={coin.id} 
            name={coin.name}
            image={coin.image}
            volume={coin.market_cap}
            symbol= {coin.symbol}
            price= {coin.current_price}
            pricechange= {coin.price_change_percentage_24h}
      />)
     })}
     </div>
     </div>
  )
}

export default Home