import './styles/App.css';
import Header from './components/Header';
import React , { useEffect } from 'react';
import Home from './components/Home';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { useDispatch } from 'react-redux';
import Login from './components/Login'
import { Toaster } from 'react-hot-toast';
import { auth } from './firebase';
import { setUser } from './slices';

function App() {


  const dispatch= useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('USER IS ->>>>>>', authUser)
      
      if(authUser){
        dispatch(setUser(authUser))
      }else {
        dispatch(setUser(null))
      }
    })
  }, [dispatch])
  

  return (
    <>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<><Header/><Home/></>}/>
          <Route path="/login" element={<Login/>}/>
         </Routes>
        <Toaster/>
      </div>
    </Router>
    </>
  );
}

export default App;
