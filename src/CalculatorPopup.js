import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './CalculatorPopup.css'
import { addBalance } from './slices';


function CalculatorPopup({ popupOpen, setPopupOpen}) {

    const [r, setR]= useState('');
    const [entry1, setEntry1]= useState('');
    const [target, setTarget]= useState('');
    const [stopLoss, setStopLoss]= useState('');
    const [type1, setType1]= useState('');
    const [fees, setFees]= useState('');


    const {balance}= useSelector(state => state.trade)


    const dispatch= useDispatch();

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
        <div className="calc__wrapper">
            <div className="calc__container">
                <div className="closeButton" onClick={()=>setPopupOpen(false)} onKeyDown={()=>setPopupOpen(false)} tabIndex={0} role="button">
                    <svg className="close" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                </div>
                <form className="calc__form" onSubmit={(e)=> handleSubmit(e)}>
                    <h1 className="from__title">Position size</h1>
                    <h3 className="under__txt">Calculator</h3>
                <div className="calc__form__container">
                    <div className='line' >
                        <h7 className="label__txt">Type</h7>
                        <label className='calc__l' htmlFor="type1" value={type1} onChange={(e)=>setType1(e.target.value)}>
                            <select name="type1" id="type1" className='calc__select'>
                                <option value="Long">
                                    Long
                                </option>
                                <option value="Short">
                                    Short
                                </option>
                            </select>
                         </label>
                    </div>
                    <div className='line'>
                        <h7 className="label__txt">Fees</h7>
                        <label className='calc__l' htmlFor="fees" value={fees} onChange={(e)=>setFees(e.target.value)}>
                            <select name="fees" className='calc__select'>
                                <option value="Exlude">
                                    Exclude
                                </option>
                                <option value="Include">
                                    Include
                                </option>
                            </select>
                         </label>
                    </div>
                    {fees === 'Include' ? ( <div className='line'>
                        <h7 className="label__txt">Entry order fee</h7>
                        <select name="status" className='calc__select'>
                            <option value="market">
                                Market (0.075%)
                            </option>
                            <option value="limit">
                                Limit (-0.025%)
                            </option>
                         </select>
                    </div>): ( <div className='line3'>
                        <h7 className="label__txt">Entry order fee</h7>
                        <select name="status" className='calc__select'>
                            <option value="Win">
                                Include
                            </option>
                            <option value="Lose">
                                Exclude
                            </option>
                         </select>
                    </div>)}
                   
                    <div className='line'>
                        <h7 className="label__txt">Risk per trade %</h7>
                        <input className='r' value={r} onChange={(e)=>setR(e.target.value)}/>
                    </div>
                    <div className='line'>
                        <h7 className="label__txt">Entry</h7>
                        <input className='r'value={entry1} onChange={(e)=>setEntry1(e.target.value)}/>
                    </div>
                    <div className='line'>
                        <h7 className="label__txt">Stop loss</h7>
                        <input className='r' value={stopLoss} onChange={(e)=>setStopLoss(e.target.value)}/>
                    </div>
                    <div className='line'>
                        <h7 className="label__txt">Target</h7>
                        <input className='r' value={target} onChange={(e)=>setTarget(e.target.value)}/>
                    </div>
                </div>
                <div className='rr'>
                    <div className='line'>
                        <h7 className="label__txt">Target %</h7>
                        <span className="label__txt1">{type1 === 'Long' ? (((target-entry1)/entry1)*100).toFixed(2) : (-1)*(((target-entry1)/entry1)*100).toFixed(2)}%</span>
                    </div>
                    <div className='line'>
                        <h7 className="label__txt">Stop loss %</h7>
                        <span className="label__txt1">{type1 === 'Short' ? (-1)*(((entry1-stopLoss)/entry1)*100).toFixed(2) : (((entry1-stopLoss)/entry1)*100).toFixed(2)}%</span>
                    </div>
                    <div className='line'>
                        <h7 className="label__txt">Risk/Reward ratio</h7>
                        <span className="label__txt1">{(((((target-entry1)/entry1)*100).toFixed(2))/((((entry1-stopLoss)/entry1)*100).toFixed(2))).toFixed(2)}</span>
                    </div>                        
                </div>
                <div className='rrr'>
                    <div className='line'>
                        <h7 className="label__txt">Balance</h7>
                        <span className="label__txt1">{balance}$</span>
                    </div>
                    <div className='line'>
                        <h7 className="label__txt">Potential profit</h7>
                        <span className="label__txt1">{(((r*0.01)*((((((target-entry1)/entry1)*100).toFixed(2))/((((entry1-stopLoss)/entry1)*100).toFixed(2))).toFixed(2)))*balance).toFixed(2)}$</span>
                    </div>
                    <div className='line'>
                        <h7 className="label__txt">Potential loss</h7>
                        <span className="label__txt1">{((r*0.01)*balance).toFixed(2)}$</span>
                    </div>
                    <div className='line'>
                        <h7 className="label__txt">Entry fee</h7>
                        <span className="label__txt1">{fees === 'limit' ? ((((balance*(r*0.01))/((entry1- stopLoss))))*entry1*(-0.00025)).toFixed(2) : (type1 === 'Short' ? ((((balance*(r*0.01))/((entry1- stopLoss))))*entry1*(0.00075)).toFixed(2) : ((((balance*(r*0.01))/((entry1- stopLoss))))*entry1*(-0.00075)).toFixed(2))}</span>
                    </div>
                    <div className='line'>
                        <h7 className="label__txt">Exit fee</h7>
                        <span className="label__txt1">{type1 === 'Short' ? ((((balance*(r*-0.01))/((entry1- stopLoss))))*target*(0.00075)).toFixed(2) : ((((balance*(r*-0.01))/((entry1- stopLoss))))*target*(0.00075)).toFixed(2)}</span>
                    </div>
                    <div className='line'>
                        <h7 className="label__txt">Order cost</h7>
                        <span className="label__txt1">{fees === 'Exclude' ? 0 : (type1 === 'Short' ? (((-1)*((balance*(r*0.01))/((entry1- stopLoss))))*entry1).toFixed(2) : ((((balance*(r*0.01))/((entry1- stopLoss))))*entry1).toFixed(2))}$</span>
                    </div>                           
                </div>
                <div className='calc__size'>
                    <h7>Optimal position size</h7>
                    <span>{type1 === 'Short' ? ((-1)*((balance*(r*0.01))/((entry1- stopLoss)))).toFixed(6) : (((balance*(r*0.01))/((entry1- stopLoss)))).toFixed(6)}</span>
                </div>
                <div>
                    {/* <button type="submit" className="button__add">Add</button> */}
                    <button className="button__cancel" onClick={()=>setPopupOpen(false)} onKeyDown={()=>setPopupOpen(false)} tabIndex={0}>Cancel</button>
                </div>
            </form>
            </div>
        </div>
        ) 
  )
}

export default CalculatorPopup