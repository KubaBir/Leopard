import React, { createContext, useContext, useEffect, useState } from 'react'

const WebSocketContext = createContext<WebSocket | null>(null)

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ws, setWs] = useState<WebSocket | null>(null)

  useEffect(() => {
    // const websocket = new WebSocket('ws://localhost:3000')
    const websocket = new WebSocket('ws://192.168.4.1')

    websocket.onopen = (): void => {
      console.log('Connected to WebSocket')
    }

    websocket.onclose = (): void => {
      console.log('Disconnected from WebSocket')
    }

    websocket.onerror = (error): void => {
      console.error('WebSocket error:', error)
    }

    setWs(websocket)

    return (): void => {
      websocket.close()
    }
  }, [])

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
}

export const useWebSocket = (): WebSocket | null => {
  return useContext(WebSocketContext)
}
