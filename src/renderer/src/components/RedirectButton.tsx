import { Link } from 'react-router-dom'

interface RedirectButtonProps {
  to: string
  children: React.ReactNode
}

export default function RedirectButton({ to, children }: RedirectButtonProps): JSX.Element {
  return (
    <Link to={to}>
      <button className="w-32 bg-gray-500 py-2 px-3 rounded-md hover:bg-gray-600 transition-colors">
        {children}
      </button>
    </Link>
  )
}
