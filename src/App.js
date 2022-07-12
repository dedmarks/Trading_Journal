import './App.css';
import Header from './Header';
import React  from 'react';
import Home from './Home';
import { Provider } from 'react-redux';
import { store } from './store';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <div className="App">
      <Provider store={store}>
      <Header/>
      <Home/>
      <Toaster/>
      </Provider>
    </div>
    </>
  );
}

export default App;
