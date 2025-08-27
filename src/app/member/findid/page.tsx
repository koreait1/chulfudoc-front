import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import FindIdContainer from '../_containers/FindIdContainer'

export default function FindIdPage() {
  return (
    <ContentBox width={420}>
      <MainTitle center="true">아이디 찾기</MainTitle>
      <FindIdContainer />
    </ContentBox>
  )
}
