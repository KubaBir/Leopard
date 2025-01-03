import React, { createContext, useContext, useEffect, useState } from 'react'

const WebSocketContext = createContext<WebSocket | null>(null)

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [shouldReconnect, setShouldReconnect] = useState(true)

  const connectWebSocket = (): void => {
    const websocket = new WebSocket('ws://localhost:3000')
    // const websocket = new WebSocket('ws://192.168.4.1:81')

    websocket.onopen = (): void => {
      console.log('Connected to WebSocket')
      setShouldReconnect(true)
    }

    websocket.onclose = (): void => {
      console.log('Disconnected from WebSocket')
      if (shouldReconnect) {
        setTimeout(() => {
          console.log(`Reconnecting to WebSocket`)
          connectWebSocket()
        }, 2000)
      }
    }

    websocket.onerror = (error): void => {
      console.error('WebSocket error:', error)
    }

    setWs(websocket)
  }

  useEffect(() => {
    connectWebSocket()

    return (): void => {
      setShouldReconnect(false)
      if (ws) {
        ws.close()
      }
    }
  }, [])

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
}

export const useWebSocket = (): WebSocket | null => {
  return useContext(WebSocketContext)
}
