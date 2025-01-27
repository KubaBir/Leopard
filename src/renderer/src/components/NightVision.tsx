import axios from 'axios'
import { useState } from 'react'
import nightVision from '../assets/svg/night-vision.svg'
import dayVision from '../assets/svg/day-vision.svg'

interface NightVisionProps {
  address: string
}

export const NightVision = ({ address }: NightVisionProps): JSX.Element => {
  const [isNightVision, setIsNightVision] = useState(false)

  const enableNightVision = async (): Promise<void> => {
    await axios.get(`http://${address}:80/control?var=special_effect&val=4`)
    setIsNightVision(true)
  }

  const disableNightVision = async (): Promise<void> => {
    await axios.get(`http://${address}:80/control?var=special_effect&val=0`)
    setIsNightVision(false)
  }

  return (
    <img
      className="cursor-pointer"
      onClick={() => (isNightVision ? disableNightVision() : enableNightVision())}
      src={isNightVision ? nightVision : dayVision}
    ></img>
  )
}
