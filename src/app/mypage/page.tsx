import UserOnlyContainer from '../_global/wrappers/UserOnlyContainer'
import ContentBox from '../_global/components/ContentBox'
import { MainTitle } from '../_global/components/TitleBox'
import UserInfo from './_components/AccountInfo'
import WrittenList from './_components/WrittenList'
import WrittenData from './_components/WrittenData'

export default function Mypage() {
  return (
    <UserOnlyContainer>
      <UserInfo />
      <ContentBox>
        <MainTitle border="true">마이페이지</MainTitle>
        <WrittenList>
          <WrittenData />
        </WrittenList>
      </ContentBox>
    </UserOnlyContainer>
  )
}
