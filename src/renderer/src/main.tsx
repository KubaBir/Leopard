import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './Router'
import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.0.102'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
)
