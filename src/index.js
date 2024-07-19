import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './styles/global.css';
import { MovieProvider } from './contexts/MovieContext';

ReactDOM.render(
  <React.StrictMode>
    <MovieProvider>
      <App />
    </MovieProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
