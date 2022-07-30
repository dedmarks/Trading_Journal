import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { db } from '../firebase';
// import { winLongs } from './slices';
import '../styles/Winrate.css'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);


function Winrate() {

    // const dispatch= useDispatch();

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

        let winLongs= 0
        let winShorts= 0
        let longs= 0
        let shorts= 0
        let wins= 0
        let loses= 0

      tradee.forEach((trade) => {
        if (trade.data.status === 'Win' && trade.data.type === 'Long') {
          winLongs++
        }else if(trade.data.status === 'Win' && trade.data.type === 'Short'){
          winShorts++
        }

        if (trade.data.type === 'Long'){
          longs++
        } else if(trade.data.type === 'Short'){
          shorts++
        }

        if(trade.data.status === 'Win'){
          wins++
        } else if(trade.data.status === 'Lose'){
          loses++
        }
      });

      const data = {
        labels: ['Wins', 'Loses'],
        datasets: [
          {
            data: [wins, loses],
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
    <div className="winrate__wraper">
      <div className="winrate__container">
              <div className="num__container">
                <h7 className="winrate__txt">Winrate</h7>
                <span className="type__num">{((wins/(tradee.length))*100).toFixed(1)} %</span>           
              </div>
              <div className="num__container">
                  <h7 className="type__name">winning longs</h7>
                  <span className="type__num">{winLongs}/{longs}</span>
              </div>
              <div className="num__container">
                  <h7 className="type__name">winning shorts</h7>
                  <span className="type__num">{winShorts}/{shorts}</span>
              </div>
      </div>
      <div className="chart__container1">
          <Doughnut data={data}/>
      </div>
    </div>
  )
}

export default Winrate