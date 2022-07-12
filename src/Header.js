import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddBalancePopup from './AddBalancePopup';
import './Header.css'
import { addBalance } from './slices';
import TodoPopup from './TodoPopup';


function Header({trade}) {
  const[popupOpen, setPopupOpen]= useState(false);
  const[addBalancePopuOpen, setAddBalancePopuOpen]= useState(false);

  const dispatch= useDispatch();

  const {tradeList, balance, profit}= useSelector((state) => state.trade)  
  
  return (
    <div className="header">
        <h3 className="header__balance">Balance : {balance}$</h3>
        <button className="button__balance" onClick={()=>setAddBalancePopuOpen(true)}>ADD</button>
        <button className="header__btnaddtrade" onClick={()=>setPopupOpen(true)}>
            ADD TRADE
        </button>
        <AddBalancePopup popupOpen={addBalancePopuOpen} setPopupOpen={setAddBalancePopuOpen}/>
        <TodoPopup typ='add' popupOpen={popupOpen} setPopupOpen={setPopupOpen}></TodoPopup>
    </div>
  )
}

export default Header