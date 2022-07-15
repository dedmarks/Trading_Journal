import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import AddBalancePopup from './AddBalancePopup';
import './Header.css'
import TradePopup from './TradePopup';


function Header() {
  const[popupOpen, setPopupOpen]= useState(false);
  const[addBalancePopuOpen, setAddBalancePopuOpen]= useState(false);

  const { balance }= useSelector((state) => state.trade)  
  
  return (
    <div className="header">
        <h3 className="header__balance">Balance : {balance}$</h3>
        <button className="button__balance" onClick={()=>setAddBalancePopuOpen(true)}>ADD</button>
        <button className="header__btnaddtrade" onClick={()=>setPopupOpen(true)}>
            ADD TRADE
        </button>
        <AddBalancePopup popupOpen={addBalancePopuOpen} setPopupOpen={setAddBalancePopuOpen}/>
        <TradePopup typ='add' popupOpen={popupOpen} setPopupOpen={setPopupOpen}></TradePopup>
    </div>
  )
}

export default Header