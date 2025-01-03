import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import AmmoCounter from '@renderer/components/AmmoCounter'
import GunIcon from '../assets/svg/gun.svg'
import CanonIcon from '../assets/svg/canon.svg'
import AmmoButton from '@renderer/components/AmmoButton'
import { useWebSocket } from '../contexts/WebSocketContext'

export default function Reloader(): JSX.Element {
  const [canonCounter, setCanonCounter] = useState(12)
  const [gunCounter, setGunCounter] = useState(12)
  const [isCanonLoaded, setIsCanonLoaded] = useState(false)
  const [isGunLoaded, setIsGunLoaded] = useState(false)

  const ws = useWebSocket()

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event): void => {
        const data = JSON.parse(event.data)
        if (data.type === 'isGunLoaded') {
          setIsGunLoaded(data.isGunLoaded)
        }
        if (data.type === 'isCanonLoaded') {
          setIsCanonLoaded(data.isCanonLoaded)
        }
      }
      const checkAndSend = (): void => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'getIsCanonLoaded' }))
          ws.send(JSON.stringify({ type: 'getIsGunLoaded' }))
        } else {
          setTimeout(checkAndSend, 100)
        }
      }

      checkAndSend()
    }
  }, [ws])

  const handlecanonLoad = async (): Promise<void> => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      setCanonCounter((prevCounter) =>
        prevCounter > 0 && !isCanonLoaded ? prevCounter - 1 : prevCounter
      )
      if (canonCounter > 0 && !isCanonLoaded) {
        ws.send(JSON.stringify({ type: 'setIsCanonLoaded' }))
      } else if (isCanonLoaded) {
        await window.electron.ipcRenderer.invoke('show-message-box', {
          title: 'Info',
          message: 'Canon is already Loaded!',
          buttons: ['OK']
        })
      } else if (canonCounter === 0) {
        await window.electron.ipcRenderer.invoke('show-message-box', {
          title: 'Info',
          message: 'You do not have canon ammo',
          buttons: ['OK']
        })
      }
    } else {
      await window.electron.ipcRenderer.invoke('show-message-box', {
        title: 'Error',
        message: 'Cannot connect to the server',
        buttons: ['OK']
      })
    }
  }

  const handleGunLoad = async (): Promise<void> => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      setGunCounter((prevCounter) =>
        prevCounter > 0 && !isGunLoaded ? prevCounter - 1 : prevCounter
      )
      if (gunCounter > 0 && !isGunLoaded) {
        ws.send(JSON.stringify({ type: 'setIsGunLoaded' }))
      } else if (isGunLoaded) {
        await window.electron.ipcRenderer.invoke('show-message-box', {
          title: 'Info',
          message: 'Gun is already Loaded!',
          buttons: ['OK']
        })
      } else if (gunCounter === 0) {
        await window.electron.ipcRenderer.invoke('show-message-box', {
          title: 'Info',
          message: 'You do not have gun ammo',
          buttons: ['OK']
        })
      }
    } else {
      await window.electron.ipcRenderer.invoke('show-message-box', {
        title: 'Error',
        message: 'Cannot connect to the server',
        buttons: ['OK']
      })
    }
  }

  return (
    <Layout>
      <div className="h-full w-full flex justify-between">
        <div className="flex flex-col gap-9 mt-24 w-1/3">
          <AmmoCounter counter={canonCounter} icon={CanonIcon}></AmmoCounter>
          <AmmoCounter counter={gunCounter} icon={GunIcon}></AmmoCounter>
        </div>
        <div className="flex justify-center items-center w-1/3">
          <div className="flex justify-around w-full ">
            <AmmoButton
              isLoaded={isCanonLoaded}
              icon={CanonIcon}
              handleLoad={handlecanonLoad}
            ></AmmoButton>
            <AmmoButton
              isLoaded={isGunLoaded}
              icon={GunIcon}
              handleLoad={handleGunLoad}
            ></AmmoButton>
          </div>
        </div>
        <div className="flex w-1/3"></div>
      </div>
    </Layout>
  )
}
