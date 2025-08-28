import { MainTitle } from '@/app/_global/components/TitleBox'
import ListContainer from './_containers/ListContainer'
import CommonSearchType from '@/app/_global/types/CommonSearchType'
import AdminOnlyContainer from '@/app/_global/wrappers/AdminOnlyContainer'

export default async function MemberListPage({
  searchParams,
}: {
  searchParams: Promise<CommonSearchType>
}) {
  const params = await searchParams
  return (
    <AdminOnlyContainer>
      <MainTitle border="true" borderthickness={'1px'}>
        회원 관리
      </MainTitle>
    </AdminOnlyContainer>
  )
}
