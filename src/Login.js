import React, { useState } from 'react'
import './Login.css'
import { auth } from './firebase'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate= useNavigate()

  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')

  const signIn = (e) =>{
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password).then((auth) => {
      navigate('/');
    }).catch(error => console.log(error.message))
  }

  const register = (e) => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email,password).then((auth) => {
      console.log(auth);
      if(auth){
        navigate('/');
      }
    }).catch(error => console.log(error.message))
  }

  return (
    <div className='login__page'>
      <form className='form__container1'>
        <h5>E-mail</h5>
        <input className='form__input1' value={email} onChange={e => setEmail(e.target.value)} type='text'/>
        <h5>Password</h5> 
        <input className='form__input1' value={password} onChange={e => setPassword(e.target.value)} type='password'/>
        <div className='btn__container'>
          <button className='signin__btn1' type='submit' onClick={signIn}>Sign in</button>
          <button className='signin__btn2' onClick={register}>Create account</button>
        </div>
      </form>
    </div>
  )
}

export default Login