import ListContainer from './_containers/ListContainer'
import { getBoardList } from '@/app/board/_services/boardConfig'
import type CommonSearchType from '@/app/_global/types/CommonSearchType'
import AdminOnlyContainer from '@/app/_global/wrappers/AdminOnlyContainer'
import { MainTitle } from '@/app/_global/components/TitleBox'

export default async function BoardListPage({
  searchParams,
}: {
  searchParams: Promise<CommonSearchType>
}) {
  const params = await searchParams
  const { items, pagination } = await getBoardList(params)

  return (
    <AdminOnlyContainer>
      <MainTitle border="true">게시판 목록</MainTitle>
      <ListContainer items={items} pagination={pagination} search={params} />
    </AdminOnlyContainer>
  )
}
