import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import AmmoCounter from '@renderer/components/AmmoCounter'
import GunIcon from '../assets/svg/gun.svg'
import CanonIcon from '../assets/svg/canon.svg'
import AmmoButton from '@renderer/components/AmmoButton'
import { useFetch, LoadedResponse } from '../hooks/useFetch'

export default function Reloader(): JSX.Element {
  const [canonCounter, setCanonCounter] = useState(12)
  const [gunCounter, setGunCounter] = useState(12)
  const [isLoaded, setIsLoaded] = useState<LoadedResponse>({
    isCanonLoaded: true,
    isGunLoaded: true
  })
  const { makeCall: checkIsLoaded } = useFetch({}, '/getIsLoaded', false)
  const { makeCall: loadCannon } = useFetch({}, '/setIsCanonLoaded', true)
  const { makeCall: loadGun } = useFetch({}, '/setIsGunLoaded', true)
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

  const handleCanonLoad = async (): Promise<void> => {
    if (isLoaded.isCanonLoaded) {
      await window.electron.ipcRenderer.invoke('show-message-box', {
        title: 'Info',
        message: 'Canon is already Loaded!',
        buttons: ['OK']
      })
    } else if (canonCounter < 1) {
      await window.electron.ipcRenderer.invoke('show-message-box', {
        title: 'Info',
        message: 'You do not have canonn ammunition left',
        buttons: ['OK']
      })
    } else {
      const data = await loadCannon()
      if (data) {
        setCanonCounter((prevState) => prevState - 1)
        setIsLoaded((prevState) => ({
          ...prevState,
          isCanonLoaded: true
        }))
      }
    }
  }

  const handleGunLoad = async (): Promise<void> => {
    if (isLoaded.isGunLoaded) {
      await window.electron.ipcRenderer.invoke('show-message-box', {
        title: 'Info',
        message: 'Gun is already Loaded!',
        buttons: ['OK']
      })
    } else if (gunCounter < 1) {
      await window.electron.ipcRenderer.invoke('show-message-box', {
        title: 'Info',
        message: 'You do not have gun ammunition left',
        buttons: ['OK']
      })
    } else {
      const data = await loadGun()
      if (data) {
        setIsLoaded((prevState) => ({
          ...prevState,
          isGunLoaded: true
        }))
        setGunCounter((prevState) => prevState - 1)
      }
    }
  }

  return (
    <Layout>
      <div
        className={`h-full w-full flex justify-between bg-[url(../assets/images/loader.webp)] bg-cover`}
      >
        <div className="flex flex-col gap-9 mt-24 w-1/3">
          <AmmoCounter counter={canonCounter} icon={CanonIcon}></AmmoCounter>
          <AmmoCounter counter={gunCounter} icon={GunIcon}></AmmoCounter>
        </div>
        <div className="flex justify-center items-center w-1/3">
          <div className="flex justify-around w-full ">
            <AmmoButton
              isLoaded={isLoaded.isCanonLoaded}
              icon={CanonIcon}
              handleLoad={handleCanonLoad}
            ></AmmoButton>
            <AmmoButton
              isLoaded={isLoaded.isGunLoaded}
              icon={GunIcon}
              handleLoad={handleGunLoad}
            ></AmmoButton>
          </div>
        </div>
        <div className="flex w-1/3"></div>
      </div>
    </Layout>
  )
}
