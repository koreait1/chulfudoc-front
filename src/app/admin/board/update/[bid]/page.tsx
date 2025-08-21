import UpdateContainer from '../../register/_containers/UpdateContainer'
export default async function BoardUpdateerPage({ params }) {
  const { bid } = await params
  return <UpdateContainer bid={bid} />
}
