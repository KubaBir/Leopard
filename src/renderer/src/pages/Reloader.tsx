import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import AmmoCounter from '@renderer/components/AmmoCounter'
import AmmoIcon from '../assets/svg/ammunition.svg'
import RocketIcon from '../assets/svg/Rocket.svg'
import AmmoButton from '@renderer/components/AmmoButton'
import { useWebSocket } from '../contexts/WebSocketContext'

export default function Reloader(): JSX.Element {
  const [rocketCounter, setRocketCounter] = useState(12)
  const [ammoCounter, setAmmoCounter] = useState(12)
  const [isRocketLoaded, setIsRocketLoaded] = useState(false)
  const [isAmmoLoaded, setIsAmmoLoaded] = useState(false)

  const ws = useWebSocket()

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event): void => {
        const data = JSON.parse(event.data)
        if (data.type === 'isAmmoLoaded') {
          setIsAmmoLoaded(data.isAmmoLoaded)
        }
        if (data.type === 'isRocketLoaded') {
          setIsRocketLoaded(data.isRocketLoaded)
        }
      }
      const checkAndSend = (): void => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'getIsRocketLoaded' }))
          ws.send(JSON.stringify({ type: 'getIsAmmoLoaded' }))
        } else {
          setTimeout(checkAndSend, 100)
        }
      }

      checkAndSend()
    }
  }, [ws])

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission().catch((err) =>
        console.error('Notification permission request failed:', err)
      )
    }
  }, [])

  const handleRocketLoad = (): void => {
    setRocketCounter((prevCounter) =>
      prevCounter > 0 && !isRocketLoaded ? prevCounter - 1 : prevCounter
    )
    if (rocketCounter > 0 && !isRocketLoaded) {
      if (ws) {
        ws.send(JSON.stringify({ type: 'setIsRocketLoaded' }))
      }
    } else if (isRocketLoaded) {
      if (Notification.permission === 'granted') {
        new Notification('Already Loaded!')
      }
    } else if (rocketCounter == 0) {
      if (Notification.permission === 'granted') {
        new Notification('Already Loaded!')
      }
    }
  }

  const handleAmmoLoad = (): void => {
    setAmmoCounter((prevCounter) =>
      prevCounter > 0 && !isAmmoLoaded ? prevCounter - 1 : prevCounter
    )
    if (ammoCounter > 0 && !isAmmoLoaded) {
      if (ws) {
        ws.send(JSON.stringify({ type: 'setIsAmmoLoaded' }))
      }
    } else if (isAmmoLoaded) {
      if (Notification.permission === 'granted') {
        new Notification('Already Loaded!')
      }
    } else if (ammoCounter == 0) {
      if (Notification.permission === 'granted') {
        new Notification('Already Loaded!')
      }
    }
  }

  return (
    <Layout>
      <div className="h-full w-full flex justify-between">
        <div className="flex flex-col gap-9 mt-24 w-1/3">
          <AmmoCounter counter={rocketCounter} icon={RocketIcon}></AmmoCounter>
          <AmmoCounter counter={ammoCounter} icon={AmmoIcon}></AmmoCounter>
        </div>
        <div className="flex justify-center items-center w-1/3">
          <div className="flex justify-around w-full ">
            <AmmoButton
              isLoaded={isRocketLoaded}
              icon={RocketIcon}
              handleLoad={handleRocketLoad}
            ></AmmoButton>
            <AmmoButton
              isLoaded={isAmmoLoaded}
              icon={AmmoIcon}
              handleLoad={handleAmmoLoad}
            ></AmmoButton>
          </div>
        </div>
        <div className="flex w-1/3"></div>
      </div>
    </Layout>
  )
}
