import ContentBox from '../_global/components/ContentBox'
import { MainTitle } from '../_global/components/TitleBox'
import UserOnlyContainer from '../_global/wrappers/UserOnlyContainer'
export default function Mypage() {
  return (
    <UserOnlyContainer>
      <ContentBox width={0}>
        <MainTitle>마이페이지</MainTitle>
      </ContentBox>
    </UserOnlyContainer>
  )
}