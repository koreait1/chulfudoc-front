import ContentBox from '@/app/_global/components/ContentBox'
import UserOnlyContainer from '@/app/_global/wrappers/UserOnlyContainer'
import ProfileContainer from '../_containers/ProfileContainer'
import { MainTitle } from '@/app/_global/components/TitleBox'

export default function ProfilePage() {
  return (
    <UserOnlyContainer>
      <ContentBox>
        <MainTitle border="true">회원정보 수정</MainTitle>
        <ProfileContainer />
      </ContentBox>
    </UserOnlyContainer>
  )
}
