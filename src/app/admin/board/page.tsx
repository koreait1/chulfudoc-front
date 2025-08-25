import ListContainer from './_containers/ListContainer'
import { getBoardConfig, getBoardList } from '@/app/board/_services/boardConfig'
import type CommonSearchType from '@/app/_global/types/CommonSearchType'

export default async function BoardListPage({
  searchParams,
}: {
  searchParams: Promise<CommonSearchType>
}) {
  const params = await searchParams
  const data = await getBoardList(params)
  console.log('data', data)

  return <ListContainer />
}
