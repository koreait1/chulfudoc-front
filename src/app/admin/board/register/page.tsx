import { MainTitle } from '@/app/_global/components/TitleBox'
import UpdateContainer from '../_containers/UpdateContainer'
import AdminOnlyContainer from '@/app/_global/wrappers/AdminOnlyContainer'
import { defaultData } from '@/app/board/_services/boardConfig'

export default async function BoardRegisterPage() {
  return (
    <AdminOnlyContainer>
      <MainTitle border="true">게시판 설정 등록</MainTitle>
      <UpdateContainer data={defaultData} />
    </AdminOnlyContainer>
  )
}
