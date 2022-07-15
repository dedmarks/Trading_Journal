import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import "./Home.css"
import Trade from './Trade';
import Chart from './Chart';
import Winrate from './Winrate';
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

   const {balanceList, tradeList} = useSelector((state) => state.trade);


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
};

const labels = balanceList;

 const data3 = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Dataset 2',
      data: balanceList.map(item => item),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};


    const sortedTradeList= [...tradeList];
    sortedTradeList.sort((a,b)=> new Date(b.time)- new Date(a.time));

    const [coins, setCoins]= useState([]);

    useEffect(() => {
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(res => {
        setCoins(res.data);
      }).catch(error=> console.log(error))
    },[])
    
  return (
    <div className="home">
      <div className="top__wraper">
        <div className="home__container">
        <h3 className="trade__label">Trade List</h3>
         
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
            {sortedTradeList && sortedTradeList.length > 0 ? 
            sortedTradeList.map((trade) => (
                <Trade
                trade={trade}
                />
            ))
            : 'no trades found'}
          </div>
        </div>
        <Winrate/> 
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