import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import App from './App';
import './index.css'; // or './App.css'


const root = ReactDOM.createRoot(document.getElementById('root')); // Create root and render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
