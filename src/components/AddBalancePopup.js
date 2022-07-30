import React, { useState }  from 'react'
import { useDispatch } from 'react-redux';
import { addBalance } from '../slices';

function AddBalancePopup({popupOpen, setPopupOpen}) {

    const dispatch= useDispatch();

    const [balance, setBalance]= useState(0);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(balance){
            dispatch(addBalance(balance));
            setPopupOpen(false);
        }
          setPopupOpen(false);
        
    };

  return (
    popupOpen && (
        <div className="wrapper">
            <div className="container">
                <div className="closeButton" onClick={()=>setPopupOpen(false)} onKeyDown={()=>setPopupOpen(false)} tabIndex={0} role="button">
                    <svg className="close" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                </div>
                <form className="form" onSubmit={(e)=> handleSubmit(e)}>
                    <h1 className="from__title">Add Balnace</h1>
                <div className="form__container">
                        <label htmlFor="asset">Balance
                            <input type="number" id="title" value={balance} onChange={(e)=>setBalance(e.target.value)}></input>
                        </label>
                </div>
                <button type="submit" className="button__add">Add</button>
                <button className="button__cancel" onClick={()=>setPopupOpen(false)} onKeyDown={()=>setPopupOpen(false)} tabIndex={0}>Cancel</button>
            </form>
            </div>
        </div>
        ) 
  )
}

export default AddBalancePopup