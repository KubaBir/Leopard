import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import { useWebSocket } from '../contexts/WebSocketContext'
import sight from '../assets/svg/sight.svg'
import ActionButton from '@renderer/components/ActionButton'
import ThrottleSlider from '@renderer/components/ThrottleSlider'
import { KeyboardArrowUp } from '@mui/icons-material'
import { KeyboardArrowDown } from '@mui/icons-material'
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
        <div className="w-1/5  flex flex-col items-start gap-8 px-4 justify-center">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`h-6 w-6 rounded-full ${!isCanonLoaded ? 'bg-red-700' : 'bg-green-600'}`}
            ></div>
            <ActionButton
              fetchEndpoint={fetchEndpoint}
              code={110}
              text="Cannon shot"
              onAction={handleCanonShot}
              disabled={!isCanonLoaded}
              keyboardKey="k"
              className={`bg-red-700 py-2 px-3 rounded-full w-32 h-32 font-bold text-2xl`}
            ></ActionButton>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className={`h-6 w-6 rounded-full ${!isGunLoaded ? 'bg-red-700' : 'bg-green-600'}`}
            ></div>
            <ActionButton
              fetchEndpoint={fetchEndpoint}
              code={111}
              text="Machine gun shot"
              onAction={handleGunShot}
              disabled={!isGunLoaded}
              keyboardKey="l"
              className={`bg-red-700 py-2 px-3 rounded-full w-32 h-32 font-bold text-2xl`}
            ></ActionButton>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 p-4 w-3/5">
          <img src={sight} className="h-4/5"></img>
        </div>
        <div className="w-1/5 flex justify-center items-center flex-col gap-8">
          <ActionButton
            fetchEndpoint={fetchEndpoint}
            code={108}
            text={<KeyboardArrowUp />}
            keyboardKey="w"
          />
          <ActionButton
            fetchEndpoint={fetchEndpoint}
            code={109}
            text={<KeyboardArrowDown />}
            keyboardKey="s"
          />
        </div>
      </div>
    </Layout>
  )
}
