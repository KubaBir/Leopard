import Layout from '../components/Layout'
import RedirectButton from '../components/RedirectButton'
import axios from 'axios'
import axios from 'axios'

export default function Home(): JSX.Element {
  async function handlePing(): Promise<undefined> {
    try {
      console.log('Sent ping...')
      const res = await axios.post('/ping', { data: 'ping' })
      if (res.data?.data === 'pong') {
        await window.electron.ipcRenderer.invoke('show-message-box', {
          title: 'Connection test',
          message: 'Pong',
          buttons: ['OK']
        })
        console.log('Got pong')
      }
    } catch (err) {
      console.log(err)
      await window.electron.ipcRenderer.invoke('show-message-box', {
        title: err.name,
        message: err.toString(),
        buttons: ['OK']
      })
    }
  }

  return (
    <Layout>
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-xl mb-6">Home Page</h1>
        <div className="flex w-full justify-center gap-5">
          <RedirectButton to="/driver">Driver</RedirectButton>
          <RedirectButton to="/commander">Commander</RedirectButton>
          <RedirectButton to="/shooter">Shooter</RedirectButton>
          <RedirectButton to="/reloader">Reloader</RedirectButton>
        </div>
        <div
          className="p-2 cursor-pointer rounded-md bg-teal-300/60 hover:bg-teal-400/60"
          onClick={handlePing}
        >
          Send ping
        </div>
      </div>
    </Layout>
  )
}
