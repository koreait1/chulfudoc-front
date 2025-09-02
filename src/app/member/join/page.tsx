import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import JoinContainer from '../_containers/JoinContainer'

export default function JoinPage() {
  return (
    <>
      <ContentBox width={520}>
        <MainTitle center="true">회원가입</MainTitle>
        <JoinContainer />
      </ContentBox>
    </>
  )
}
