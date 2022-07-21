import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {addBalance } from './slices';
import './TradePopup.css'
import {db} from './firebase'
import {Timestamp} from 'firebase/firestore'
import {v4 as uuid} from 'uuid';

function TodoPopup({typ, popupOpen, setPopupOpen, trade}) {
    const [asset, setAsset]= useState('');
    const [date, setDate]= useState('');
    const [confluance, setConfluance]= useState('');
    const [size, setSize]= useState('');
    const [type, setType]= useState('');
    const [entry, setEntry]= useState('');
    const [exit, setExit]= useState('');
    const [status, setStatus]= useState('');
    const [profit, setProfit]= useState('');
    const[tardeBalance, setTradeBalance]= useState([])

    const { user } = useSelector(state => state.trade)

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

       const id=uuid()


    const dispatch = useDispatch();

    useEffect(() => {
        if (typ === 'update' && trade) {
          setAsset(trade.asset);
          setDate(trade.date);
          setSize(trade.size);
          setEntry(trade.entry);
          setExit(trade.exit);
          setProfit(trade.profit);
          setConfluance(trade.confluance);
          setStatus(trade.status);
          setType(trade.type);
        } else {
          setAsset('');
          setDate('');
          setSize('');
          setEntry('');
          setExit('');
          setProfit('')
          setConfluance('');
          setStatus('Win');
          setType('Long');
        }
      }, [typ, popupOpen,trade]);

    const handleSubmut = async (e) =>{
        e.preventDefault();
        if(asset && date && size && entry && exit && status && confluance && type && profit){
            dispatch(addBalance(profit));
            if(typ === 'add'){
                try{
           
                    db.collection('users').doc(user ? user.uid : user.uid=0).collection('tradeBalance').doc(id).set({
                        profit: profit,
                        created: Timestamp.now()
                    })
                    db.collection('users').doc(user ? user.uid : user.uid=0).collection('balList').doc(id).set({
                        bal: parseInt(profit)+ balance,
                        created: Timestamp.now()
                    })
                }catch(err){
                    alert(err)
                }
        
            // dispatch(addTrade({
            //     id: uuid(),
            //     asset,
            //     profit,
            //     date,
            //     size,
            //     entry,
            //     exit,
            //     status,
            //     confluance,
            //     type,
            //     time: new Date().toLocaleString(),
            // }));
          
           
            db.collection('users').doc(user ? user.uid : user.uid=0).collection('trades').doc(id).set({
                id: id,
                asset: asset,
                profit: profit,
                date: date,
                size: size,
                entry: entry,
                exit: exit,
                status: status,
                confluance: confluance,
                type: type,
                created: Timestamp.now()
            })
            toast.success('Trade added successsfully');
            setPopupOpen(false);
        }

        if (typ === 'update') {
            const taskDocRef = db.collection('users').doc(user?.uid).collection('trades').doc(trade.id)
            const task1DocRef = db.collection('users').doc(user?.uid).collection('tradeBalance').doc(trade.id)
            const task2DocRef = db.collection('users').doc(user?.uid).collection('balList').doc(trade.id)
            
               taskDocRef.update({
                asset: asset,
                profit: profit,
                date: date,
                size: size,
                entry: entry,
                exit: exit,
                status: status,
                confluance: confluance,
                type: type,
              })

              task1DocRef.update({
                profit: profit
            })

            task2DocRef.update({
                bal: balance- parseInt(profit)
            })

              toast.success('Trade updated successsfully');  
              
         };
         setPopupOpen(false)
        }
    };
  return (
    popupOpen &&(
    <div className="wrapper">
        <div className="container">
            <div className="closeButton" onClick={()=>setPopupOpen(false)} onKeyDown={()=>setPopupOpen(false)} tabIndex={0} role="button">
                <svg className="close" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
            </div>
            <form className="form" onSubmit={(e)=> handleSubmut(e)}>
            <h1 className="from__title" >{typ=== 'add' ? 'Add' : 'Update'} Trade</h1>
                <div className="form__container">
                <div className="popup__row1">
                        <label htmlFor="asset">Asset
                            <input type="text" id="title" value={asset} onChange={(e)=>setAsset(e.target.value)}></input>
                        </label>
                    <label htmlFor="entry">Entry
                    <input classname="Entry__input" type="number" id="title" value={entry} onChange={(e)=>setEntry(e.target.value)}></input>
                    </label>
                    <label htmlFor="size">Size
                    <input type="number" id="title" value={size} onChange={(e)=>setSize(e.target.value)}></input>
                    </label>
                    <label htmlFor="status" value={status} onChange={(e)=>setStatus(e.target.value)}>Status
                <select name="status" id="status">
                    <option value="Win">
                        Win
                    </option>
                    <option value="Lose">
                        Lose
                    </option>
                </select>
                </label>
                <label htmlFor="type" value={type} onChange={(e)=>setType(e.target.value)}>Type
                <select name="type" id="type">
                    <option value="Long">
                        Long
                    </option>
                    <option value="Short">
                        Short
                    </option>
                </select>
                </label>
                </div>
                <div className="popup__row2">
                    <label htmlFor="date">Date
                    <input type="date" id="title" value={date} onChange={(e)=>setDate(e.target.value)}></input>
                    </label>
                    <label htmlFor="exit">Exit
                    <input classname="Entry__input" type="number" id="title" value={exit} onChange={(e)=>setExit(e.target.value)}></input>
                    </label>
                    <div className="tag__section">
                        <label htmlFor="confluance">Confluance
                        <input type="text" id="title" value={confluance} onChange={(e)=>setConfluance(e.target.value)}></input>
                        {/* <button className="button__tag">add</button> */}
                        </label>
                    </div>
                    <label htmlFor="profit">Profit
                    <input classname="Entry__input" type="number" id="profit" value={profit} onChange={(e)=>setProfit(e.target.value)}></input>
                    </label>
                </div>
                </div>
                <button type="submit" className="button__add">{typ === 'add' ? 'Add' : 'Update'} Trade</button>
                <button className="button__cancel" onClick={()=>setPopupOpen(false)} onKeyDown={()=>setPopupOpen(false)} tabIndex={0}>Cancel</button>
            </form>
        </div>
    </div>
    )
  )
}

export default TodoPopup