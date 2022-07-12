import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { winLongs } from './slices';
import './Winrate.css'

function Winrate() {

    const dispatch= useDispatch();

    const {tradeList, winlongs, winshorts, longs, shorts, wins} = useSelector((state) => state.trade);

    useEffect(()=>{
        dispatch(winLongs());
    },[tradeList])

  return (
    <div className="winrate__container">
        <h3 className="winrate__txt">Winrate</h3>
        <span className="winrate__percent">{((wins/(tradeList.length))*100).toFixed(1)} %</span>
        <div className="info__container">
            <div className="num__container">
                <h7 className="type__name">winning longs</h7>
                <span className="type__num">{winlongs}/{longs}</span>
            </div>
            <div className="num__container">
                <h7 className="type__name">winning shorts</h7>
                <span className="type__num">{winshorts}/{shorts}</span>
            </div>
        </div>
    </div>
  )
}

export default Winrate