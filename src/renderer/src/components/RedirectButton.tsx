import { Link } from 'react-router-dom'

interface RedirectButtonProps {
  to: string
  children: React.ReactNode
}

export default function RedirectButton({ to, children }: RedirectButtonProps): JSX.Element {
  return (
    <Link to={to}>
      <button className="w-32 bg-gray-500 p-4">{children}</button>
    </Link>
  )
}
