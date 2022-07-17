import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getDocs} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCB8WZ41fueYajGZ0A2pLcLZeqYK1roFes",
    authDomain: "tradingjournal-54502.firebaseapp.com",
    projectId: "tradingjournal-54502",
    storageBucket: "tradingjournal-54502.appspot.com",
    messagingSenderId: "934296610965",
    appId: "1:934296610965:web:4550cc5317a8ee822f139c",
    measurementId: "G-WH2YJRNB79"
  };
  
  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore();
  const auth= firebase.auth();
  const provider= new firebase.auth.GoogleAuthProvider()
  
  const dd= db.collection('trades')

  getDocs(dd).then((snap) => {
    let trades = []
    snap.docs.forEach((doc) => {
      trades.push({...doc.data(), id: doc.id})
    })
    console.log(trades)
  }).catch(err => {
    console.log(err.message)
  })

  export {db, auth, provider, dd};