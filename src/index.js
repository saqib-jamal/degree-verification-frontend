import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Web3Provider } from './context/Web3Context';
console.log("Web3Provider:", Web3Provider);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Web3Provider>
      <App />
    </Web3Provider>
  
);