import { MainTitle } from '@/app/_global/components/TitleBox'
import UpdateContainer from '../_containers/UpdateContainer'
import AdminOnlyContainer from '@/app/_global/wrappers/AdminOnlyContainer'

export default function BoardRegisterPage() {
  return (
    <AdminOnlyContainer>
      <MainTitle border="true">게시판 설정 등록</MainTitle>
      <UpdateContainer />
    </AdminOnlyContainer>
  )
}
