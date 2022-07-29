import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ProgressBar from './ProgressBar';
import { db } from './firebase';
// import { winLongs } from './slices';
import './Goal.css'



function Goal() {

    const [tardeBalance, setTradeBalance]= useState([])
    const [goalData, setGoalData]= useState('')
    const [goal, setGoal]= useState('')
    const [goalPrice, setGoalPrice]= useState('')
    const [viewForm, setViewForm]= useState(false)
    const [show, setShow] = useState(false);
    const [viewEditForm, setViewEditForm]= useState(false)
    const [btnShow, setBtnShow] = useState(false);
    const { user }= useSelector(state => state.trade)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        db.collection('users').doc(user?.uid).collection('goal').doc('55555').set({
            goal: goal,
            goalPrice: goalPrice
        })
        setShow(true)
        setBtnShow(false)
    }

    const handleProceed= () => {
        setViewForm(true)
        setBtnShow(false)
    }
    
    const handleUpdate1 = (e) => {
        e.preventDefault();
        db.collection('users').doc(user?.uid).collection('goal').doc('55555').update({
            goal: goal,
            goalPrice: goalPrice
        })
        
        setShow(true)
        setViewForm(false)
        setBtnShow(false)
        setViewEditForm(false)
    }   

    const handleEdit= () => {
        setViewForm(false)
        setBtnShow(false)
        setViewEditForm(true)
        setShow(false)
    }

  
    useEffect(() => {
      try{

        if(goalData.length !== 0){
            setShow(true)
            setBtnShow(false)
        }else {
            setBtnShow(true)
        }

        db.collection('users').doc(user?.uid).collection('tradeBalance')
        .onSnapshot((querySnapshot) => (
          setTradeBalance(querySnapshot.docs.map(doc => (
            doc.data()
          )))
        ))
        db.collection('users').doc(user?.uid).collection('goal')
        .onSnapshot((querySnapshot) => (
          setGoalData(querySnapshot.docs.map(doc => (
            doc.data()
          )))
        ))  
    }catch(err){
        alert(err)
    }
     
    },[user, goalData.length])

    console.log(goalData)
    
     const initialValue= 0
     const balanceList= tardeBalance.map((x) => parseInt(x.profit))
     const balance= balanceList.reduce((x,y) => x+y, initialValue)


  return (
    <div className="winrate__wraper">
            {btnShow && (
            <button className="header__btnaddtrade1" onClick={()=> handleProceed()}>SET YOUR GOAL</button>
            )}

             {viewForm && (
             <form className="formg__container" onSubmit={(e)=> handleSubmit(e)}>
                <label htmlFor="asset">Description
                    <input type="text" id="title" value={goal} onChange={(e)=>setGoal(e.target.value)}></input>
                </label>
                <label htmlFor="entry">Price
                    <input classname="Entry__input" type="number" id="title" value={goalPrice} onChange={(e)=>setGoalPrice(e.target.value)}></input>
                </label>   
             <button className="addGoalBtn" type="submit">Add</button>
             </form>
                 )} 
            
                {show &&  (<div className='bar__container'>
                    <h3 className="goal__txt">{goalData[0].goal}</h3>
                    <h3 className="goal__txt">{balance} / {goalData[0].goalPrice}$</h3>
                    <ProgressBar bgcolor="#fcba03" completed={((balance/goalData[0].goalPrice)*100).toFixed(3)} />
                    <button className="editbtn" onClick={() => handleEdit()}>Edit</button>
                </div>)}

                {viewEditForm && (
                    <form className="formg__container" onSubmit={(e)=> handleUpdate1(e)}>
                    <label htmlFor="asset">Description
                        <input type="text" id="title" value={goal} onChange={(e)=>setGoal(e.target.value)}></input>
                    </label>
                    <label htmlFor="entry">Price
                        <input classname="Entry__input" type="number" id="title" value={goalPrice} onChange={(e)=>setGoalPrice(e.target.value)}></input>
                    </label>
                    <button className="addGoalBtn" type="submit">Edit</button>
                </form>
                )} 

           
    </div>
  )
}

export default Goal