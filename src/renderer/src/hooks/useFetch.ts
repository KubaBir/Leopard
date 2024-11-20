import axios from 'axios'

export const useFetch = (arg: { [key: string]: number }): { makeCall: () => Promise<void> } => {
  const makeCall = async (): Promise<void> => {
    try {
      const response = await axios.post('/request', arg)
      console.log(response.data)
    } catch (err) {
      await window.electron.ipcRenderer.invoke('show-message-box', {
        title: err.name,
        message: err.message,
        buttons: ['OK']
      })
    }
  }

  return { makeCall }
}
