import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import FindPwContainer from '../_containers/FindPwContainer'

export default function FindPwPage() {
  return (
    <ContentBox width={420}>
      <MainTitle center="true">비밀번호 찾기</MainTitle>
      <FindPwContainer />
    </ContentBox>
  )
}
