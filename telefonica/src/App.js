import React from 'react';
import {hot} from 'react-hot-loader';
import './styles/App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ListService from './components/ListService';

function App() {

  return (
    <Router>
        <div className='container'>
           <ListService/> 

        </div>
    </Router>
    
  );
}

export default hot(module)(App);