import Layout from '../components/Layout'
import ActionButton from '../components/ActionButton'
import { useState, useEffect } from 'react'
import ThrottleSlider from '@renderer/components/ThrottleSlider'
import Throttle from '../assets/svg/throttle.svg'
import Reverse from '../assets/svg/reverse.svg'
import BatteryFull from '../assets/svg/batery-full.svg'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { CameraView } from '@renderer/components/CameraView'
import { cameraUrls } from '../config'
import { NightVision } from '@renderer/components/NightVision'

export default function Driver(): JSX.Element {
  const fetchEndpoint = '/driver'
  const [throttle, setThrottle] = useState(80)
  const [isConnected, setIsConnected] = useState(false)

  const simulateKeyPress = (key: string) => {
    const event = new KeyboardEvent('keydown', { key })
    console.log(key, 'pressed')
    window.dispatchEvent(event)
  }

  const simulateKeyRelease = (key: string) => {
    const event = new KeyboardEvent('keyup', { key })
    window.dispatchEvent(event)
  }

  useEffect(() => {
    const handleGamepadConnected = (event: GamepadEvent) => {
      console.log('Gamepad connected:', event.gamepad)
      setIsConnected(true)
    }

    const handleGamepadDisconnected = (event: GamepadEvent) => {
      console.log('Gamepad disconnected:', event.gamepad)
      simulateKeyRelease('w')
      simulateKeyRelease('s')
      simulateKeyRelease('a')
      simulateKeyRelease('d')
      setIsConnected(false)
    }

    window.addEventListener('gamepadconnected', handleGamepadConnected)
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected)

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected)
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected)
    }
  }, [])

  useEffect(() => {
    let animationFrameId: number

    const pollGamepad = () => {
      const gamepads = navigator.getGamepads()
      const gamepad = gamepads[0]

      if (gamepad && isConnected) {
        const steering = gamepad.axes[0]
        const throttleBrake = gamepad.axes[1]

        if (steering < -0.5) {
          simulateKeyPress('a')
          simulateKeyRelease('d')
        } else if (steering > 0.5) {
          simulateKeyPress('d')
          simulateKeyRelease('a')
        } else {
          simulateKeyRelease('a')
          simulateKeyRelease('d')
        }

        if (throttleBrake > 0.5) {
          simulateKeyPress('s')
          simulateKeyRelease('w')
        } else if (throttleBrake < -0.5) {
          simulateKeyPress('w')
          simulateKeyRelease('s')
        } else {
          simulateKeyRelease('w')
          simulateKeyRelease('s')
        }
      }

      animationFrameId = requestAnimationFrame(pollGamepad)
    }

    if (isConnected) {
      pollGamepad()
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isConnected])

  return (
    <Layout>
      <CameraView address={cameraUrls.driver} classes="rotate-180" />

      <div className="absolute bottom-4 left-4">
        <ThrottleSlider numBars={8} value={throttle} setValue={setThrottle} />
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-6 items-end">
        <ActionButton
          fetchEndpoint={fetchEndpoint}
          code={102}
          throttle={throttle}
          text="Back"
          keyboardKey="s"
          cancelEndpoint="moving"
        >
          <img src={Reverse} alt="" />
        </ActionButton>
        <ActionButton
          fetchEndpoint={fetchEndpoint}
          code={101}
          throttle={throttle}
          text="Up"
          keyboardKey="w"
          cancelEndpoint="moving"
        >
          <img src={Throttle} alt="" />
        </ActionButton>
      </div>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 gap-4 flex">
        <ActionButton
          fetchEndpoint={fetchEndpoint}
          code={103}
          throttle={throttle}
          text={<KeyboardArrowLeft />}
          keyboardKey="a"
          cancelEndpoint="rotation"
        />
        <ActionButton
          fetchEndpoint={fetchEndpoint}
          code={104}
          throttle={throttle}
          text={<KeyboardArrowRightIcon />}
          keyboardKey="d"
          cancelEndpoint="rotation"
        />
      </div>

      <div className="absolute top-4 right-4 flex flex-col items-center gap-4">
        <img src={BatteryFull} alt="" />

        <NightVision address={cameraUrls.driver} />
      </div>
    </Layout>
  )
}
