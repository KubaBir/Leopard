import { Slider } from '@mui/material'
import Layout from '../components/Layout'
import { useState } from 'react'
import ActionButton from '@renderer/components/ActionButton'
import ThrottleSlider from '@renderer/components/ThrottleSlider'
import BatteryFull from '../assets/svg/batery-full.svg'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'

export default function Commander(): JSX.Element {
  const fetchEndpoint = '/commander'

  const [throttle, setThrottle] = useState(80)

  return (
    <Layout>
      <div className="absolute bottom-4 left-4">
        <ThrottleSlider numBars={4} value={throttle} setValue={setThrottle} />
      </div>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 gap-4 flex">
        <ActionButton
          fetchEndpoint={fetchEndpoint}
          code={105}
          throttle={throttle}
          text={<KeyboardArrowLeft />}
          keyboardKey="a"
        />
        <ActionButton
          fetchEndpoint={fetchEndpoint}
          code={106}
          throttle={throttle}
          text={<KeyboardArrowRight />}
          keyboardKey="d"
        />
      </div>

      <div className="absolute top-4 right-4">
        <img src={BatteryFull} alt="" />
      </div>
    </Layout>
  )
}
