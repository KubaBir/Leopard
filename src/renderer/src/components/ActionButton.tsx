import { useFetch } from '../hooks/useFetch'

interface ActionButtonProps {
  code: number
  text: string
  fetchEndpoint: string
}

export default function ActionButton({
  code,
  fetchEndpoint,
  text
}: ActionButtonProps): JSX.Element {
  const { makeCall: makeCall } = useFetch({ code: code }, fetchEndpoint)
  const { makeCall: cancelRequest } = useFetch({ code: code }, `${fetchEndpoint}/cancel`)

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
