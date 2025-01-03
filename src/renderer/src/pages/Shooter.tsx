import ShootButton from '@renderer/components/ShootButton'
import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import { useWebSocket } from '../contexts/WebSocketContext'
import sight from '../assets/svg/sight.svg'
export default function Shooter(): JSX.Element {
  const fetchEndpoint = '/gunner'
  const [isCanonLoaded, setIsCanonLoaded] = useState(false)
  const [isGunLoaded, setIsGunLoaded] = useState(false)

  const ws = useWebSocket()
  useEffect(() => {
    if (ws) {
      ws.onmessage = (event): void => {
        const data = JSON.parse(event.data)

        if (data.type === 'isCanonLoaded') {
          setIsCanonLoaded(data.isCanonLoaded)
        } else if (data.type === 'isGunLoaded') {
          setIsGunLoaded(data.isGunLoaded)
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

  const handleCanonShot = (): void => {
    if (ws) {
      ws.send(JSON.stringify({ type: 'setIsCanonLoaded' }))
      setIsCanonLoaded(false)
    }
  }
  const handleGunShot = (): void => {
    if (ws) {
      ws.send(JSON.stringify({ type: 'setIsGunLoaded' }))
      setIsGunLoaded(false)
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
            onAction={handleCanonShot}
            disabled={!isCanonLoaded}
          ></ShootButton>
          <ShootButton
            fetchEndpoint={fetchEndpoint}
            code={111}
            text="Gun"
            onAction={handleGunShot}
            disabled={!isGunLoaded}
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
