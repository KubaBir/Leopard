import { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { useAnyButtonClicked } from '@renderer/contexts/AnyButtonClickedContext'
interface ActionButtonProps {
  code: number
  throttle?: number
  text: string
  fetchEndpoint: string
  shouldCancel?: boolean
  keyboardKey?: string
}

export default function ActionButton({
  code,
  throttle,
  fetchEndpoint,
  text,
  shouldCancel = true,
  keyboardKey
}: ActionButtonProps): JSX.Element {
  const requestData = { code, throttle }
  const { makeCall: makeCall } = useFetch(requestData, fetchEndpoint)
  const { makeCall: cancelRequest } = useFetch(requestData, `${fetchEndpoint}/cancel`)
  const [isActive, setIsActive] = useState(false)
  const { buttonClicked, setButtonClicked } = useAnyButtonClicked()

  const handleRequest = (): void => {
    makeCall()
    setIsActive(true)
    setButtonClicked(true)
  }

  const handleCancel = (): void => {
    cancelRequest()
    setIsActive(false)
    setButtonClicked(false)
  }
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key.toLocaleLowerCase() === keyboardKey?.toLocaleLowerCase() && !buttonClicked) {
        handleRequest()
      }
    }

    const handleKeyUp = (event: KeyboardEvent): void => {
      if (event.key.toLocaleLowerCase() === keyboardKey?.toLocaleLowerCase() && isActive) {
        handleCancel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return (): void => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [keyboardKey, makeCall, cancelRequest, buttonClicked, setButtonClicked])

  useEffect(() => console.log('bnutton clicked', buttonClicked), [buttonClicked])
  return (
    <button
      className={`bg-gray-500 py-2 px-3 rounded-md w-32  ${isActive ? 'bg-gray-800' : 'hover:bg-gray-600'}`}
      onMouseDown={() => {
        if (!buttonClicked) {
          handleRequest()
        }
      }}
      onMouseUp={() => {
        if (isActive) {
          handleCancel()
        }
      }}
    >
      {text}
    </button>
  )
}
