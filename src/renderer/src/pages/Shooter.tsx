import ShootButton from '@renderer/components/ShootButton'
import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import { useWebSocket } from '../contexts/WebSocketContext'
import sight from '../assets/svg/sight.svg'
import ActionButton from '@renderer/components/ActionButton'
export default function Shooter(): JSX.Element {
  const fetchEndpoint = '/gunner'
  const [isRocketLoaded, setIsRocketLoaded] = useState(false)
  const [isAmmoLoaded, setIsAmmoLoaded] = useState(false)

  const ws = useWebSocket()
  useEffect(() => {
    if (ws) {
      ws.onmessage = (event): void => {
        const data = JSON.parse(event.data)

        if (data.type === 'isRocketLoaded') {
          setIsRocketLoaded(data.isRocketLoaded)
        } else if (data.type === 'isAmmoLoaded') {
          console.log(data)
          setIsAmmoLoaded(data.isAmmoLoaded)
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

  const handleRocketShot = (): void => {
    if (ws) {
      ws.send(JSON.stringify({ type: 'setIsRocketLoaded' }))
      setIsRocketLoaded(false)
    }
  }
  const handleGunShot = (): void => {
    if (ws) {
      ws.send(JSON.stringify({ type: 'setIsAmmoLoaded' }))
      setIsAmmoLoaded(false)
    }
  }
  return (
    <Layout>
      <div className="w-full h-full flex justify-between">
        <div className="w-1/5 mt-24 flex flex-col items-start gap-8">
          {' '}
          <ShootButton
            fetchEndpoint={fetchEndpoint}
            code={110}
            text="Cannon"
            onAction={handleRocketShot}
            disabled={!isRocketLoaded}
          ></ShootButton>
          <ShootButton
            fetchEndpoint={fetchEndpoint}
            code={111}
            text="Gun"
            onAction={handleGunShot}
            disabled={!isAmmoLoaded}
          ></ShootButton>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 p-4 w-3/5">
          <img src={sight} className="h-4/5"></img>
        </div>
        <div className="w-1/5"></div>
      </div>
    </Layout>
  )
}
