import ListContainer from './_containers/MemberListContainer'
import { getMemberList } from '@/app/member/_services/actions'
import type CommonSearchType from '@/app/_global/types/CommonSearchType'
import AdminOnlyContainer from '@/app/_global/wrappers/AdminOnlyContainer'
import { MainTitle } from '@/app/_global/components/TitleBox'

export default async function MemberListPage({
  searchParams,
}: { searchParams: Promise<CommonSearchType> }) {
  const params = await searchParams
  const { items, pagination } = await getMemberList(params)

  return (
    <AdminOnlyContainer>
      <MainTitle border="true">회원 목록</MainTitle>
      <ListContainer items={items} pagination={pagination} search={params} />
    </AdminOnlyContainer>
  )
}
