import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import AmmoCounter from '@renderer/components/AmmoCounter'
import HEIcon from '../assets/svg/high-explosive.svg'
import APDSIcon from '../assets/svg/canon.svg'
import AmmoButton from '@renderer/components/AmmoButton'
import { useFetch, LoadedResponse } from '../hooks/useFetch'

export default function Reloader(): JSX.Element {
  const [APDSCounter, setAPDSCounter] = useState(12)
  const [HECounter, setHECounter] = useState(12)
  const [isLoaded, setIsLoaded] = useState<LoadedResponse>({
    isAPDSLoaded: true,
    isHELoaded: true
  })
  const { makeCall: checkIsLoaded } = useFetch({}, '/getIsLoaded', false)
  const { makeCall: loadCannon } = useFetch({}, '/setisAPDSLoaded', true)
  const { makeCall: loadHE } = useFetch({}, '/setisHELoaded', true)
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

  const handleAPDSLoad = async (): Promise<void> => {
    if (isLoaded.isAPDSLoaded || isLoaded.isHELoaded) {
      await window.electron.ipcRenderer.invoke('show-message-box', {
        title: 'Info',
        message: 'Canon is already Loaded!',
        buttons: ['OK']
      })
    } else if (APDSCounter < 1) {
      await window.electron.ipcRenderer.invoke('show-message-box', {
        title: 'Info',
        message: 'You do not have APDSn ammunition left',
        buttons: ['OK']
      })
    } else {
      const data = await loadCannon()
      if (data) {
        setAPDSCounter((prevState) => prevState - 1)
        setIsLoaded((prevState) => ({
          ...prevState,
          isAPDSLoaded: true
        }))
      }
    }
  }

  const handleHELoad = async (): Promise<void> => {
    if (isLoaded.isAPDSLoaded || isLoaded.isHELoaded) {
      await window.electron.ipcRenderer.invoke('show-message-box', {
        title: 'Info',
        message: 'Canon is already Loaded!',
        buttons: ['OK']
      })
    } else if (HECounter < 1) {
      await window.electron.ipcRenderer.invoke('show-message-box', {
        title: 'Info',
        message: 'You do not have HE ammunition left',
        buttons: ['OK']
      })
    } else {
      const data = await loadHE()
      if (data) {
        setIsLoaded((prevState) => ({
          ...prevState,
          isHELoaded: true
        }))
        setHECounter((prevState) => prevState - 1)
      }
    }
  }

  return (
    <Layout>
      <div
        className={`h-full w-full flex justify-between bg-[url(../assets/images/loader.webp)] bg-cover`}
      >
        <div className="flex flex-col gap-9 mt-24 w-1/3">
          <AmmoCounter counter={APDSCounter} icon={APDSIcon}></AmmoCounter>
          <AmmoCounter counter={HECounter} icon={HEIcon}></AmmoCounter>
        </div>
        <div className="flex justify-center items-center w-1/3">
          <div className="flex justify-around w-full ">
            <AmmoButton
              isLoaded={isLoaded.isAPDSLoaded}
              icon={APDSIcon}
              handleLoad={handleAPDSLoad}
            ></AmmoButton>
            <AmmoButton
              isLoaded={isLoaded.isHELoaded}
              icon={HEIcon}
              handleLoad={handleHELoad}
            ></AmmoButton>
          </div>
        </div>
        <div className="flex w-1/3"></div>
      </div>
    </Layout>
  )
}
