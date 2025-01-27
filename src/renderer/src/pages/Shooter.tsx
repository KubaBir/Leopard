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
  const { makeCall: shootAPDS } = useFetch({}, '/setisAPDSLoaded', true)
  const { makeCall: shootHE } = useFetch({}, '/setisHELoaded', true)
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
      <CameraView address={cameraUrls.shooter} classes="rotate-180" />

      <div className="w-full h-full flex justify-between z-10">
        <div className="flex flex-col gap-8 px-4 pt-4">
          <div className="flex items-center gap-6 justify-center w-full">
            <div
              className={`size-[70px] flex shadow-inner ring-2 justify-center items-center rounded-full ${!isLoaded.isAPDSLoaded ? 'bg-red-900 ring-red-950' : 'bg-green-600 ring-green-700'}`}
            >
              APDS
            </div>
            <div
              className={`size-[70px] flex justify-center items-center ring-2  rounded-full ${!isLoaded.isHELoaded ? 'bg-red-900 ring-red-950' : 'bg-green-600 ring-green-700'}`}
            >
              HE
            </div>
            {/* <ActionButton
              fetchEndpoint={fetchEndpoint}
              code={110}
              text="APDS"
              onAction={handleAPDSShot}
              disabled={!isLoaded.isAPDSLoaded}
              keyboardKey="k"
              className={`bg-red-700 py-2 px-3 rounded-full w-32 h-32 font-bold text-2xl`}
            ></ActionButton> */}
          </div>
          <div className="flex flex-col items-center gap-2">
            <ActionButton
              fetchEndpoint={fetchEndpoint}
              code={110}
              text="Fire"
              onAction={
                isLoaded.isHELoaded
                  ? handleHEShot
                  : isLoaded.isAPDSLoaded
                    ? handleAPDSShot
                    : undefined
              }
              keyboardKey="l"
              disabled={!isLoaded.isHELoaded && !isLoaded.isAPDSLoaded}
              className={`bg-red-700 cursor-pointer py-2 px-3 rounded-full w-32 h-32 font-bold text-2xl`}
            ></ActionButton>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ActionButton
              fetchEndpoint={fetchEndpoint}
              code={111}
              text="Machine gun"
              keyboardKey="l"
              className={`bg-red-700 py-2 px-3 rounded-full w-32 h-32 font-bold text-2xl`}
            ></ActionButton>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 p-4 absolute inset-0 -z-10">
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
        </div>
      </div>

      <div className="flex justify-center items-center self-start absolute bottom-8 left-8">
        <ThrottleSlider numBars={4} value={throttle} setValue={setThrottle} />
      </div>

      <div className="absolute bottom-8 right-8 z-50">
        <ActionButton
          fetchEndpoint="centerTurret"
          code={110}
          text="Center"
          keyboardKey="c"
          shouldCancel={false}
          className={`bg-gray-500 py-2 px-3 rounded-lg w-32 h-12 font-semibold text-2xl`}
        ></ActionButton>
      </div>
    </Layout>
  )
}
