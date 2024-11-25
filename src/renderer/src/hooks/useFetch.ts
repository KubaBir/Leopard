import axios from 'axios'
import { useState } from 'react'

export const useFetch = (
  arg: { [key: string]: number | string },
  url?: string
): { data: string | null; makeCall: () => Promise<void> } => {
  const [data, setData] = useState(null)
  const final_url = url ? url : '/request'

  const makeCall = async (): Promise<void> => {
    try {
      const response = await axios.post(final_url, arg)
      setData(data)
      console.log(response.data)
    } catch (err) {
      await window.electron.ipcRenderer.invoke('show-message-box', {
        title: err.name,
        message: err.message,
        buttons: ['OK']
      })
    }
  }

  return { data, makeCall }
}
