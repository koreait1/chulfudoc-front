import AdminOnlyContainer from '../_global/wrappers/AdminOnlyContainer'
import { MainTitle } from '../_global/components/TitleBox'
export default function AdminPage() {
  return (
    <AdminOnlyContainer>
      <MainTitle>관리자 메인</MainTitle>
    </AdminOnlyContainer>
  )
}