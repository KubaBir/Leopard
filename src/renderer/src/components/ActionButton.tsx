import { useFetch } from '../hooks/useFetch'

interface ActionButtonProps {
  code: number
  throttle?: number
  text: string
  fetchEndpoint: string
  shouldCancel?: boolean
}

export default function ActionButton({
  code,
  throttle,
  fetchEndpoint,
  text,
  shouldCancel = true
}: ActionButtonProps): JSX.Element {
  const requestData = { code, throttle }
  const { makeCall: makeCall } = useFetch(requestData, fetchEndpoint)
  const { makeCall: cancelRequest } = useFetch(requestData, `${fetchEndpoint}/cancel`)

  return (
    <button
      className=" bg-gray-500 py-2 px-3 rounded-md w-32 hover:bg-gray-600 "
      onMouseDown={makeCall}
      onMouseUp={cancelRequest}
    >
      {text}
    </button>
  )
}
