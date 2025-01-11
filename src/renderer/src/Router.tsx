import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Driver from './pages/Driver'
import Shooter from './pages/Shooter'
import Reloader from './pages/Reloader'
import Commander from './pages/Commander'
import NotFound from './pages/NotFound'

export function AppRouter(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/shooter" element={<Shooter />} />
        <Route path="/reloader" element={<Reloader />} />
        <Route path="/commander" element={<Commander />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}
