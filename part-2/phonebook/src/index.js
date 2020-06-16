import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';

const persons = [
  {
    id: 1,
    content: 'Arto Hellas'
  }
]

ReactDOM.render(
  <React.StrictMode>
    <App persons={persons}/>
  </React.StrictMode>,
  document.getElementById('root')
);
