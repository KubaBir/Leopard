import { Slider } from '@mui/material'
import Layout from '../components/Layout'
import { useState } from 'react'
import ActionButton from '@renderer/components/ActionButton'

export default function Commander(): JSX.Element {
  const fetchEndpoint = '/commander'

  const [throttle, setThrottle] = useState(80)
  return (
    <Layout>
      <h1>Commander</h1>

      <div className="flex gap-24 h-64">
        <div className="flex gap-6">
          <ActionButton fetchEndpoint={fetchEndpoint} code={105} throttle={throttle} text="Left" />
          <ActionButton fetchEndpoint={fetchEndpoint} code={106} throttle={throttle} text="Right" />
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
