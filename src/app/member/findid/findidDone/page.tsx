import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import FindIdDoneContainer from '../../_containers/FindIdDoneContainer'

export default function FindIdDonePage() {
  return (
    <ContentBox width={520}>
      <MainTitle center="true">아이디 찾기</MainTitle>
      <FindIdDoneContainer />
    </ContentBox>
  )
}
