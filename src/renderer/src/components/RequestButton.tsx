import { useFetch } from '@renderer/hooks/useFetch'

interface RequestButtonProps {
  endpoint: string
}

export const RequestButton = ({ endpoint }: RequestButtonProps): JSX.Element => {
  const { makeCall } = useFetch({}, endpoint)

  return (
    <button
      onClick={makeCall}
      className="py-2 px-3 rounded-md w-24 h-10 hover:bg-gray-600 bg-gray-500"
    >
      Center
    </button>
  )
}
