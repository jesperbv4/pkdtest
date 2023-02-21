import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './App.css';
import reportWebVitals from './reportWebVitals';
import AlgoContext from './SortingVisualizer/SortingVisualizer';




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
      <AlgoContext>
        <App />
      </AlgoContext>
      
    </React.StrictMode>
  );

