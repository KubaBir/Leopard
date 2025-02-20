import Layout from '../components/Layout'
import RedirectButton from '../components/RedirectButton'
import { useFetch } from '@renderer/hooks/useFetch'
export default function Home(): JSX.Element {
  const { makeCall: testConnection } = useFetch({}, '/ping')

  return (
    <Layout>
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-xl mb-6">Home Page</h1>
        <div className="flex w-full justify-center gap-5">
          <RedirectButton to="/driver">Driver</RedirectButton>
          <RedirectButton to="/shooter">Gunner</RedirectButton>
          <RedirectButton to="/commander">Commander</RedirectButton>
          <RedirectButton to="/reloader">Loader</RedirectButton>
        </div>
        <div
          className="p-2 cursor-pointer rounded-md bg-teal-300/60 hover:bg-teal-400/60"
          onClick={testConnection}
        >
          Send ping
        </div>
      </div>
    </Layout>
  )
}
