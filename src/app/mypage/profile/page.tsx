import UserOnlyContainer from '@/app/_global/wrappers/UserOnlyContainer'
import ProfileContainer from '../_containers/ProfileContainer'
import { MainTitle } from '@/app/_global/components/TitleBox'
import Header from '@/app/_global/outlines/Header'
import Padding from '@/app/_global/components/padding-top'

export default function ProfilePage() {
  return (
    <>
      <UserOnlyContainer>
        <Header />
        <Padding />
        <MainTitle border={''} center={'true'}>
          회원정보 수정
        </MainTitle>
        <ProfileContainer />
      </UserOnlyContainer>
    </>
  )
}
