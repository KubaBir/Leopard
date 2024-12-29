import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './Router'
import axios from 'axios'
import { WebSocketProvider } from './contexts/WebSocketContext'

axios.defaults.baseURL = 'http://192.168.4.1'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WebSocketProvider>
      <AppRouter />
    </WebSocketProvider>
  </React.StrictMode>
)
