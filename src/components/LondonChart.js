import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { db } from '../firebase';
// import { winLongs } from './slices';
import '../styles/Winrate.css'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

function LondonChart() {

    const {user} = useSelector((state) => state.trade);
    const[tradee, setTradee]= useState([]);

    // useEffect(()=>{
    //     dispatch(winLongs());
    // },[tradeList])

    useEffect(() => {
        try{
          db.collection('users').doc(user?.uid).collection('trades').orderBy('created', 'desc')
          .onSnapshot((querySnapshot) => (
            setTradee(querySnapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
            })))
          ))
      }catch(err){
          alert(err)
      }
       
      },[user])

        let Londonwins= 0
        let Londonloses= 0
       

      tradee.forEach((trade) => {
        if (trade.data.status === 'Win' && trade.data.session === 'London') {
            Londonwins++
        }else if(trade.data.status === 'Lose' && trade.data.session === 'London'){
            Londonloses++
        }
      });

      const data = {
        labels: ['Wins', 'Loses'],
        datasets: [
          {
            data: [Londonwins, Londonloses],
            backgroundColor: [
              'rgba(73, 255, 73, 0.2)',
              'rgba(255, 76, 41, 0.2)',
            ],
            borderColor: [
              'rgba(73, 255, 73, 0.9)',
              'rgba(255, 76, 41, 0.9)',
            ],
            borderWidth: 1,
          },
        ],
      };

  return (
    <div className="c">
      <h3 className="session__title">London Session</h3>
        <div className="chart__container2">
          <Doughnut data={data}/>
        </div>
        <span className="session__percentage">{((Londonwins/(Londonwins+Londonloses))*100).toFixed(2)}%</span>
    </div>
  )
}

export default LondonChart