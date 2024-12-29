interface AmmoCounterProps {
  icon: string
  isLoaded: boolean
  handleLoad: () => void
}

export default function AmmoButton({ icon, handleLoad, isLoaded }: AmmoCounterProps): JSX.Element {
  return (
    <button
      onClick={handleLoad}
      className={`w-16 md:w-32 bg-gray-600 h-40 md:h-80  flex justify-center items-center p-3 rounded-lg ${isLoaded ? 'border-2 border-blue-600' : ''}`}
    >
      {' '}
      <img src={icon} alt="Ammo Icon" className="h-full" />
    </button>
  )
}
