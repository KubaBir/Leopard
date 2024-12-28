import Layout from '../components/Layout'
import ActionButton from '../components/ActionButton'
import { useState } from 'react'
import ThrottleSlider from '@renderer/components/ThrottleSlider'
import Throttle from '../assets/svg/throttle.svg'
import Reverse from '../assets/svg/reverse.svg'
import BatteryFull from '../assets/svg/batery-full.svg'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { KeyboardArrowLeft } from '@mui/icons-material'

export default function Driver(): JSX.Element {
  const fetchEndpoint = '/driver'

  const [throttle, setThrottle] = useState(80)

  return (
    <Layout>
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
        >
          <img src={Reverse} alt="" />
        </ActionButton>
        <ActionButton
          fetchEndpoint={fetchEndpoint}
          code={101}
          throttle={throttle}
          text="Up"
          keyboardKey="w"
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
        />
        <ActionButton
          fetchEndpoint={fetchEndpoint}
          code={104}
          throttle={throttle}
          text={<KeyboardArrowRightIcon />}
          keyboardKey="d"
        />
      </div>

      <div className="absolute top-4 right-4">
        <img src={BatteryFull} alt="" />
      </div>
    </Layout>
  )
}
