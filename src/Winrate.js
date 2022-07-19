import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { db } from './firebase';
// import { winLongs } from './slices';
import './Winrate.css'

function Winrate() {

    const dispatch= useDispatch();

    const {tradeList, winshorts,user} = useSelector((state) => state.trade);
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
        }
      });

      console.log(tradee)
      console.log(winLongs, winShorts)

  return (
    <div className="winrate__container">
        <h3 className="winrate__txt">Winrate</h3>
        <span className="winrate__percent">{((wins/(tradee.length))*100).toFixed(1)} %</span>
        <div className="info__container">
            <div className="num__container">
                <h7 className="type__name">winning longs</h7>
                <span className="type__num">{winLongs}/{longs}</span>
            </div>
            <div className="num__container">
                <h7 className="type__name">winning shorts</h7>
                <span className="type__num">{winShorts}/{shorts}</span>
            </div>
        </div>
    </div>
  )
}

export default Winrate