import ActionButton from '@renderer/components/ActionButton'
import Layout from '../components/Layout'

export default function Shooter(): JSX.Element {
  const fetchEndpoint = '/shooter'
  return (
    <Layout>
      <h1>Shooter</h1>
      <div className="flex flex-col items-center gap-5 p-4">
        <ActionButton fetchEndpoint={fetchEndpoint} code={110} text="Cannon"></ActionButton>
        <ActionButton fetchEndpoint={fetchEndpoint} code={111} text="Gun"></ActionButton>
      </div>
    </Layout>
  )
}
