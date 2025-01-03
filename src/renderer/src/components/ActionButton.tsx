import { useEffect, useState } from 'react'
import { ReactElement } from 'react'
import { useFetch } from '../hooks/useFetch'
interface ActionButtonProps {
  code: number
  throttle?: number
  text: string | JSX.Element
  fetchEndpoint: string
  shouldCancel?: boolean
  keyboardKey?: string
  onAction?: () => void
  className?: string
  disabled?: boolean
  children?: ReactElement
}

export default function ActionButton({
  code,
  throttle,
  fetchEndpoint,
  text,
  shouldCancel = true,
  keyboardKey,
  onAction,
  className,
  disabled,
  children
}: ActionButtonProps): JSX.Element {
  const requestData = { code, throttle }
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
    <button
      disabled={disabled}
      className={
        className ||
        `py-2 px-3 rounded-md w-32  ${isActive ? 'bg-gray-800' : 'hover:bg-gray-600'} ${children ? 'hover:scale-105' : 'bg-gray-500 hover:bg-gray-600'}`
      }
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
      {children ?? text}
    </button>
  )
}
