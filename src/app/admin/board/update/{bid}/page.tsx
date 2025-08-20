import UpdateContainer from '../../_containers/UpdateContainer'

export default async function BoardUpdatePage({ params }) {
  const { bid } = await params
  return <UpdateContainer />
}
