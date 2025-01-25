import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import sight from '../assets/svg/sight.svg'
import ActionButton from '@renderer/components/ActionButton'
import ThrottleSlider from '@renderer/components/ThrottleSlider'
import {
  KeyboardArrowUp,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowDown
} from '@mui/icons-material'
import { useFetch, LoadedResponse } from '../hooks/useFetch'
import { CameraView } from '@renderer/components/CameraView'
import { cameraUrls } from '../config'
export default function Shooter(): JSX.Element {
  const fetchEndpoint = '/gunner'
  const [isLoaded, setIsLoaded] = useState<LoadedResponse>({
    isAPDSLoaded: false,
    isHELoaded: false
  })
  const [throttle, setThrottle] = useState(80)

  const { makeCall: checkIsLoaded } = useFetch({}, '/getIsLoaded', false)
  const { makeCall: shootAPDS } = useFetch({}, '/setIsAPDSLoaded', true)
  const { makeCall: shootHE } = useFetch({}, '/setIsHELoaded', true)
  useEffect(() => {
    const fetchLoadedStatus = async (): Promise<void> => {
      const data = await checkIsLoaded()
      if (data && typeof data !== 'string') {
        setIsLoaded(data)
      }
    }
    fetchLoadedStatus()
    const intervalId = setInterval(fetchLoadedStatus, 2000)

    return (): void => clearInterval(intervalId)
  }, [])

  const handleAPDSShot = async (): Promise<void> => {
    if (isLoaded.isAPDSLoaded) {
      setIsLoaded((prevState) => ({
        ...prevState,
        isAPDSLoaded: false
      }))
      await shootAPDS()
    }
  }

  const handleHEShot = async (): Promise<void> => {
    if (isLoaded.isHELoaded) {
      setIsLoaded((prevState) => ({
        ...prevState,
        isHELoaded: false
      }))
      await shootHE()
    }
  }
  return (
    <Layout>
      <CameraView address={cameraUrls.shooter} />

      <div className="w-full h-full flex justify-between z-10">
        <div className="w-1/5  flex flex-col items-start gap-8 px-4 justify-center">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`h-6 w-6 rounded-full ${!isLoaded.isAPDSLoaded ? 'bg-red-700' : 'bg-green-600'}`}
            ></div>
            <ActionButton
              fetchEndpoint={fetchEndpoint}
              code={110}
              text="APDS"
              onAction={handleAPDSShot}
              disabled={!isLoaded.isAPDSLoaded}
              keyboardKey="k"
              className={`bg-red-700 py-2 px-3 rounded-full w-32 h-32 font-bold text-2xl`}
            ></ActionButton>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className={`h-6 w-6 rounded-full ${!isLoaded.isHELoaded ? 'bg-red-700' : 'bg-green-600'}`}
            ></div>
            <ActionButton
              fetchEndpoint={fetchEndpoint}
              code={110}
              text="High explosive"
              onAction={handleHEShot}
              keyboardKey="l"
              disabled={!isLoaded.isHELoaded}
              className={`bg-red-700 py-2 px-3 rounded-full w-32 h-32 font-bold text-2xl`}
            ></ActionButton>
          </div>
          <div className="flex justify-center items-center">
            <ThrottleSlider numBars={4} value={throttle} setValue={setThrottle} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 p-4 w-3/5">
          <img src={sight} className="h-4/5"></img>
        </div>
        <div className="w-1/5 flex justify-center items-center flex-col gap-8">
          <ActionButton
            fetchEndpoint={fetchEndpoint}
            code={111}
            text="Machine gun"
            keyboardKey="l"
            className={`bg-red-700 py-2 px-3 rounded-full w-32 h-32 font-bold text-2xl`}
          ></ActionButton>
          <ActionButton
            fetchEndpoint={fetchEndpoint}
            code={108}
            text={<KeyboardArrowUp />}
            keyboardKey="w"
          />
          <div className="flex gap-8">
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
          <ActionButton
            fetchEndpoint={fetchEndpoint}
            code={109}
            text={<KeyboardArrowDown />}
            keyboardKey="s"
          />
          <ActionButton
            fetchEndpoint="centerTurret"
            code={110}
            text="Center"
            keyboardKey="c"
            shouldCancel={false}
            className={`bg-gray-500 py-2 px-3 rounded-lg w-32 h-12 font-semibold text-2xl`}
          ></ActionButton>{' '}
        </div>
      </div>
    </Layout>
  )
}
