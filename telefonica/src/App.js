import React from 'react';
import {hot} from 'react-hot-loader';
import './styles/App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ListService from './components/ListService';

function App() {

  return (
    <Router>
        <div className='container mt-5'>
            <h5 className="text-center text-uppercase font-weight-bold"> App Servidores</h5>
           <ListService/> 

        </div>
    </Router>
    
  );
}

export default hot(module)(App);