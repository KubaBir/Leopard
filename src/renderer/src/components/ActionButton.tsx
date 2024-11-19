import { useFetch } from '../hooks/useFetch'

interface ActionButtonProps {
  code: number
  text: string
}

export default function ActionButton({ code, text }: ActionButtonProps): JSX.Element {
  const { makeCall: makeCall } = useFetch({ code: code })

  return (
    <button
      className=" bg-gray-500 py-2 px-3 rounded-md w-32 hover:bg-gray-600 "
      onClick={makeCall}
    >
      {text}
    </button>
  )
}
