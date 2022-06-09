import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

    const user = null
    
    ReactDOM.render(
      <Router>
        <App user={user} />
      </Router>,
      document.getElementById('root')
    );
 

reportWebVitals();
