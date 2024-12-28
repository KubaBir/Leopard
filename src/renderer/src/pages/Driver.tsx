import Layout from '../components/Layout'
import ActionButton from '../components/ActionButton'
import Slider from '@mui/material/Slider'
import { useState } from 'react'

export default function Driver(): JSX.Element {
  const fetchEndpoint = '/driver'

  const [throttle, setThrottle] = useState(80)

  return (
    <Layout>
      <div className="flex gap-24">
        <div className="flex flex-col items-center gap-5">
          <ActionButton
            fetchEndpoint={fetchEndpoint}
            code={101}
            throttle={throttle}
            text="Up"
            keyboardKey="w"
          />
          <div className="flex w-96 justify-between ">
            <ActionButton
              fetchEndpoint={fetchEndpoint}
              code={103}
              throttle={throttle}
              text="Left"
              keyboardKey="a"
            />
            <ActionButton
              fetchEndpoint={fetchEndpoint}
              code={104}
              throttle={throttle}
              text="Right"
              keyboardKey="d"
            />
          </div>
          <ActionButton
            fetchEndpoint={fetchEndpoint}
            code={102}
            throttle={throttle}
            text="Back"
            keyboardKey="s"
          />
        </div>
        <Slider
          aria-label="Temperature"
          orientation="vertical"
          valueLabelDisplay="auto"
          value={throttle}
          onChange={(_event, val) => typeof val === 'number' && setThrottle(val)}
          min={10}
          max={100}
        />
      </div>
    </Layout>
  )
}
