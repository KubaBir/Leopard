import axios from 'axios'

export const useFetch = (
  arg: { [key: string]: number | string },
  url?: string
): { makeCall: () => Promise<string | void> } => {
  const final_url = url ? url : '/request'
  const makeCall = async (): Promise<string | void> => {
    try {
      const response = await axios.post(final_url, arg)
      return response.data
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
