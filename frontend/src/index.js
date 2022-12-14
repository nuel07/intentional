import React from 'react';
import { createRoot } from 'react-dom/client';
//import { Provider } from 'react-redux';
//import { store } from './app/store';
import App from './App';
import { ContextProvider } from './context/Context';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>  
  </React.StrictMode>
);
