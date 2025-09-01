import UserOnlyContainer from '../_global/wrappers/UserOnlyContainer'
import ContentBox from '../_global/components/ContentBox'
import { MainTitle } from '../_global/components/TitleBox'
import UserInfo from './_components/AccountInfo'
import WrittenList from './_components/WrittenList'
import WrittenData from './_components/WrittenData'
import DeleteButton from './_components/DeleteButton'

export default function Mypage() {
  return (
    <UserOnlyContainer>
      <MainTitle border={"true"} borderthickness="1px" center={"true"}>마이페이지</MainTitle>
      <UserInfo />
      <ContentBox>
        <WrittenList>
          <WrittenData />
        </WrittenList>
        <DeleteButton />
      </ContentBox>
    </UserOnlyContainer>
  )
}
