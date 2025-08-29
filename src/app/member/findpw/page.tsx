import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import FindContainer from '../_containers/FindContainer'

export default function FindPwPage() {
  return (
    <ContentBox width={520}>
      <MainTitle center="true">비밀번호 찾기</MainTitle>
      <FindContainer mode='pw' />
    </ContentBox>
  )
}
