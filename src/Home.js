import React from 'react'
import { useSelector } from 'react-redux';
import "./Home.css"
import Trade from './Trade';
import Chart from './Chart';
import Winrate from './Winrate';
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
    
  return (
    <div className="home">
      <div className="top__wraper">
        <div className="home__container">
        <h3 className="trade__label">Trade List</h3>
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
          <div className="trades__container">
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
     {/* <h3 className="trade__label">Periodic goals</h3> */}

     </div>
  )
}

export default Home