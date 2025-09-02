import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import JoinContainer from '../_containers/JoinContainer'
import Header from '@/app/_global/outlines/Header'

export default function JoinPage() {
  return (
    <>
      <Header />
      <ContentBox width={520}>
        <MainTitle center="true">회원가입</MainTitle>
        <JoinContainer />
      </ContentBox>
    </>
  )
}
