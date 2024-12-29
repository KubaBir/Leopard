import { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'

interface ShootButtonProps {
  code: number
  text: string
  fetchEndpoint: string
  keyboardKey?: string
  disabled?: boolean
  onAction?: () => void
}

export default function ShootButton({
  code,
  text,
  fetchEndpoint,
  keyboardKey,
  disabled,
  onAction
}: ShootButtonProps): JSX.Element {
  const requestData = { code }
  const { makeCall: makeCall } = useFetch(requestData, fetchEndpoint)
  const { makeCall: cancelRequest } = useFetch(requestData, `${fetchEndpoint}/cancel`)
  const [isActive, setIsActive] = useState(false)

  const handleRequest = (): void => {
    makeCall()
    setIsActive(true)
  }
  const handleCancel = (): void => {
    cancelRequest()
    setIsActive(false)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key.toLocaleLowerCase() === keyboardKey?.toLocaleLowerCase() && !isActive) {
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
  }, [keyboardKey, makeCall, cancelRequest])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`h-6 w-6 rounded-full ${disabled ? 'bg-red-700' : 'bg-green-600'}`}></div>
      <button
        disabled={disabled}
        className={`bg-red-700 py-2 px-3 rounded-full w-32 h-32 font-bold text-2xl  ${isActive ? 'bg-red-900' : 'hover:bg-red-500'}`}
        onMouseDown={() => {
          if (!isActive) {
            handleRequest()
          }
        }}
        onMouseUp={() => {
          if (isActive) {
            handleCancel()
            if (onAction) {
              onAction()
            }
          }
        }}
      >
        {text}
      </button>
    </div>
  )
}
