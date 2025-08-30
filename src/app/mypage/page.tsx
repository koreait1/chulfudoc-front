import UserOnlyContainer from '../_global/wrappers/UserOnlyContainer'
import ContentBox from '../_global/components/ContentBox'
import { MainTitle } from '../_global/components/TitleBox'
import Written from './_containers/WrittenListContainer'
import UserInfo from './_components/AccountInfo'
import { Button } from '../_global/components/Buttons'

export default function Mypage() {
  return (
    <UserOnlyContainer>
      <UserInfo />
      <ContentBox>
        <MainTitle border="true">마이페이지</MainTitle>
        <Written />
      </ContentBox>
    </UserOnlyContainer>
  )
}
