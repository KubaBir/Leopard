import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Driver from './pages/Driver'
import Shooter from './pages/Shooter'
import Reloader from './pages/Reloader'
import Commander from './pages/Commander'
import { useFetch } from './hooks/useFetch'
import { useEffect } from 'react'
export function AppRouter(): JSX.Element {
  const { makeCall: testConnection } = useFetch({ data: 'ping' }, '/ping')

  // useEffect((): (() => void) => {
  //   const interval = setInterval(async () => {
  //     const data = await testConnection()

  //     if (data !== 'pong') {
  //       await window.electron.ipcRenderer.invoke('show-message-box', {
  //         title: 'Connection test',
  //         message: 'You lost a connection to the Leopard',
  //         buttons: ['OK']
  //       })
  //     }
  //   }, 5000)

  //   return () => clearInterval(interval)
  // }, [testConnection])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/shooter" element={<Shooter />} />
        <Route path="/reloader" element={<Reloader />} />
        <Route path="/commander" element={<Commander />} />
      </Routes>
    </Router>
  )
}
