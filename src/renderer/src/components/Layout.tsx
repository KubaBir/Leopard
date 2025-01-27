import { ReactNode, useEffect, useState } from 'react'
import RedirectButton from './RedirectButton'
import { useLocation } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  const [time, setTime] = useState(new Date())
  const location = useLocation()

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return (): void => clearInterval(timer)
  }, [])

  return (
    <div className="w-screen h-screen bg-black relative overflow-clip flex flex-col">
      <div className="h-14 bg-gray-900 items-center justify-center grid grid-cols-3 px-2">
        {location.pathname === '/' ? <div /> : <RedirectButton to="/">Home</RedirectButton>}
        <div className="text-center text-xl leading-3">
          {time.toLocaleTimeString('pl-PL', {
            hour: 'numeric',
            minute: 'numeric'
          })}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center relative flex-1 overflow-clip">
        {children}
      </div>
    </div>
  )
}
