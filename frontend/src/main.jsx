import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import StoreContextProvider from './context/Storecontext.jsx';
// In React, BrowserRouter is a component provided by the React Router library, 
//which enables routing in a single-page application (SPA). It allows you to navigate between different views 
//or components within the app without reloading the page.
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StoreContextProvider>
  <App />
  </StoreContextProvider>
 
    </BrowserRouter>
  
)
