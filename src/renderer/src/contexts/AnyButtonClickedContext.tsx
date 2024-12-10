import React, { createContext, useContext, useState, ReactNode } from 'react'

interface AnyButtonClickedContextProps {
  buttonClicked: boolean
  setButtonClicked: (clicked: boolean) => void
}

const AnyButtonClickedContext = createContext<AnyButtonClickedContextProps | undefined>(undefined)

export const AnyButtonClickedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [buttonClicked, setButtonClicked] = useState<boolean>(false)

  return (
    <AnyButtonClickedContext.Provider value={{ buttonClicked, setButtonClicked }}>
      {children}
    </AnyButtonClickedContext.Provider>
  )
}

export const useAnyButtonClicked = (): AnyButtonClickedContextProps => {
  const context = useContext(AnyButtonClickedContext)
  if (context === undefined) {
    throw new Error('context not found')
  }
  return context
}
