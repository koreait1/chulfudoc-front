import UpdateContainer from '../_containers/UpdateContainer'
import { MainTitle } from '@/app/_global/components/TitleBox'

export default function BoardRegisterPage() {
  return (
    <>
      <MainTitle border="true">게시판 설정 등록</MainTitle>
      <UpdateContainer />
    </>
  )
}
