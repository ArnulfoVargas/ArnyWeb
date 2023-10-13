import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
import PageRouter from './routes/PageRouter';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PageRouter/>
    </BrowserRouter>
  </React.StrictMode>
)
