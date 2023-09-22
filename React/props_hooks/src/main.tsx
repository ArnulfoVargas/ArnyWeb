import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import MainApp from './MainApp'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
{/*    <SimpleState title="Buenas" initialN={0}/> */}

  <MainApp/>
  </React.StrictMode>,
)
