import Layout from '../components/Layout'
import ActionButton from '../components/ActionButton'
export default function Driver(): JSX.Element {
  const fetchEndpoint = '/shooter'

  return (
    <Layout>
      <div className="flex flex-col items-center gap-5">
        <ActionButton fetchEndpoint={fetchEndpoint} code={101} text="Up"></ActionButton>
        <div className="flex w-96 justify-between ">
          {' '}
          <ActionButton fetchEndpoint={fetchEndpoint} code={103} text="Left"></ActionButton>
          <ActionButton fetchEndpoint={fetchEndpoint} code={104} text="Right"></ActionButton>
        </div>
        <ActionButton fetchEndpoint={fetchEndpoint} code={102} text="Back"></ActionButton>
      </div>
    </Layout>
  )
}
