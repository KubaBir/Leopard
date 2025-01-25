import axios from 'axios'

export interface LoadedResponse {
  isAPDSLoaded: boolean
  isHELoaded: boolean
}

export const useFetch = (
  args: { code?: number; throttle?: number } = {},
  url?: string,
  isPost: boolean = true
): { makeCall: () => Promise<string | void | LoadedResponse> } => {
  const final_url = url ? url : '/request'
  const makeCall = async (): Promise<string | void | LoadedResponse> => {
    try {
      const response = isPost
        ? await axios.post(final_url, args)
        : await axios.get(final_url, { params: args })
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
