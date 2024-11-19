import Layout from '../components/Layout'
import RedirectButton from '../components/RedirectButton'

export default function Home(): JSX.Element {
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
      </div>
    </Layout>
  )
}
