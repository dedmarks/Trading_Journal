import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTrade } from './slices';
import TradePopup from './TradePopup';
import "./Trade.css"
import { db } from './firebase';

function Trade( { trade, asset, date, size, entry, exit, profit, status, type, confluance }) {

  const dispatch= useDispatch();
  const [updateTradeOpen, setUpdateTradeOpen]= useState(false);

  const {user} = useSelector(state => state.trade)
  

  const handleDelete= () => {
    dispatch(deleteTrade(trade.id));
    db.collection('users').doc(user?.uid).collection('trades').doc(trade.id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
  }

  const handleUpdate= () => {
    setUpdateTradeOpen(true);
  }
  

  return (
    <>
    <div className="trade">
        <div className="trade__element">
            <h5 className="trade__Asset">{trade.asset}</h5>
            <h5 className="trade__Date">{trade.date}</h5>
            <h5 className="trade__Size">{trade.size}</h5>
            <h5 className="trade__Entry">{trade.entry}</h5>
            <h5 className="trade__Exit">{trade.exit}</h5>
            <h5 className="trade__Exit">{trade.profit}$</h5>
            {trade.status === 'Win' ? (
              <div className="trade__Status" >
                <h5 className="trade__txt green">{trade.status}</h5>
              </div>
            ): (<div className="trade__Status" >
                  <h5 className="trade__txt red">{trade.status}</h5>
                </div>)}
            
            <h5 className="trade__Type">{trade.type}</h5>
            <h5 className="trade__Confluance">{trade.confluance}</h5>
            <p className="mod__icons" onClick={handleUpdate} role="button" tabIndex="0"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
               <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
               <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
               </svg>
            </p>
            <p className="mod__icons" onClick={handleDelete} role="button" tabIndex="0"> 
              <svg onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
              <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
              </svg>
            </p>
            <TradePopup 
              typ="update"
              trade={trade}
              popupOpen={updateTradeOpen}
              setPopupOpen={setUpdateTradeOpen}
            />
        </div>
    </div>
    </>
  )
}

export default Trade