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
    isCanonLoaded: false,
    isGunLoaded: false
  })
  const [throttle, setThrottle] = useState(80)

  const { makeCall: checkIsLoaded } = useFetch({}, '/getIsLoaded', false)
  const { makeCall: shootCannon } = useFetch({}, '/setIsCanonLoaded', true)
  const { makeCall: shootGun } = useFetch({}, '/setIsGunLoaded', true)
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

  const handleCanonShot = async (): Promise<void> => {
    if (isLoaded.isCanonLoaded) {
      setIsLoaded((prevState) => ({
        ...prevState,
        isCanonLoaded: false
      }))
      await shootCannon()
    }
  }

  const handleGunShot = async (): Promise<void> => {
    if (isLoaded.isGunLoaded) {
      setIsLoaded((prevState) => ({
        ...prevState,
        isGunLoaded: false
      }))
      await shootGun()
    }
  }
  return (
    <Layout>
      <CameraView address={cameraUrls.shooter} />

      <div className="w-full h-full flex justify-between z-10">
        <div className="w-1/5  flex flex-col items-start gap-8 px-4 justify-center">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`h-6 w-6 rounded-full ${!isLoaded.isCanonLoaded ? 'bg-red-700' : 'bg-green-600'}`}
            ></div>
            <ActionButton
              fetchEndpoint={fetchEndpoint}
              code={110}
              text="Cannon shot"
              onAction={handleCanonShot}
              disabled={!isLoaded.isCanonLoaded}
              keyboardKey="k"
              className={`bg-red-700 py-2 px-3 rounded-full w-32 h-32 font-bold text-2xl`}
            ></ActionButton>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className={`h-6 w-6 rounded-full ${!isLoaded.isGunLoaded ? 'bg-red-700' : 'bg-green-600'}`}
            ></div>
            <ActionButton
              fetchEndpoint={fetchEndpoint}
              code={111}
              text="Machine gun shot"
              onAction={handleGunShot}
              keyboardKey="l"
              disabled={!isLoaded.isGunLoaded}
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
