interface AmmoCounterProps {
  counter: number
  icon: string
}

export default function AmmoCounter({ counter, icon }: AmmoCounterProps): JSX.Element {
  return (
    <div className="bg-gray-600 flex w-64 h-20 rounded-lg justify-between items-center px-11 text-5xl py-2 text-black">
      <img src={icon} alt="Ammo Icon" className="h-full" />
      <p className="font-semibold">{counter}</p>
    </div>
  )
}
