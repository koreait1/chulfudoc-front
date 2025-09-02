import UserOnlyContainer from '@/app/_global/wrappers/UserOnlyContainer'
import ProfileContainer from '../_containers/ProfileContainer'
export default function ProfilePage() {
  return (
    <>
      <UserOnlyContainer>
        <ProfileContainer />
      </UserOnlyContainer>
    </>
  )
}
