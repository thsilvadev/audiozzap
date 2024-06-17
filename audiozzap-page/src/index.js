import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';



//global variable declaration workaround for API Address.
const apiUrl = process.env.REACT_APP_API_URL;

window.name = apiUrl; /* "https://api.mtgchest.com"; */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);