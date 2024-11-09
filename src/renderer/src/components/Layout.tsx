import { ReactNode } from 'react'
import RedirectButton from './RedirectButton'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="w-screen h-screen bg-blue-700 flex justify-center items-center relative">
      <div className="absolute top-0 left-0 ">
        <RedirectButton to="/">Home</RedirectButton>
      </div>
      <div className="flex flex-col justify-center items-center w-full h-full">{children}</div>
    </div>
  )
}
