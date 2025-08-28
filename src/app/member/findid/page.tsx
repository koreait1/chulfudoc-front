import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import FindContainer from '../_containers/FindContainer'

export default function FindIdPage() {
  return (
    <ContentBox width={420}>
      <MainTitle center="true">아이디 찾기</MainTitle>
      <FindContainer mode='id'/>
    </ContentBox>
  )
}
