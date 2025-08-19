import AdminOnlyContainer from '../_global/wrappers/AdminOnlyContainer'
import { MainTitle } from '../_global/components/TitleBox'
export default function AdminPage() {
  return (
    <AdminOnlyContainer>
      <MainTitle border="true">관리자 메인</MainTitle>
    </AdminOnlyContainer>
  )
}
