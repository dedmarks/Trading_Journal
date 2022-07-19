import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import AddBalancePopup from './AddBalancePopup';
import { db } from './firebase';
import './Header.css'
import TradePopup from './TradePopup';


function Header() {
  const[popupOpen, setPopupOpen]= useState(false);
  const[addBalancePopuOpen, setAddBalancePopuOpen]= useState(false);
  const[tardeBalance, setTradeBalance]= useState([])

  const { user }= useSelector(state => state.trade)

  useEffect(() => {
    try{
      db.collection('users').doc(user?.uid).collection('tradeBalance')
      .onSnapshot((querySnapshot) => (
        setTradeBalance(querySnapshot.docs.map(doc => (
          doc.data()
        )))
      ))
  }catch(err){
      alert(err)
  }
   
  },[user])

  
   const initialValue= 0
   const balanceList= tardeBalance.map((x) => parseInt(x.profit))
   const balance= balanceList.reduce((x,y) => x+y, initialValue)
  
  return (
    <div className="header">
        <h3 className="header__balance">Balance : {balance}$</h3>
        {/* <button className="button__balance" onClick={()=>setAddBalancePopuOpen(true)}>ADD</button> */}
        <button className="header__btnaddtrade" onClick={()=>setPopupOpen(true)}>
            ADD TRADE
        </button>
        <AddBalancePopup popupOpen={addBalancePopuOpen} setPopupOpen={setAddBalancePopuOpen}/>
        <TradePopup typ='add' popupOpen={popupOpen} setPopupOpen={setPopupOpen}></TradePopup>
    </div>
  )
}

export default Header