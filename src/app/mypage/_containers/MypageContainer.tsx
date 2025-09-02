'use client'
import UserOnlyContainer from '../../_global/wrappers/UserOnlyContainer'
import ContentBox from '../../_global/components/ContentBox'
import { MainTitle } from '../../_global/components/TitleBox'
import UserInfo from '../_components/AccountInfo'
import WrittenList from '../_components/WrittenList'
import WrittenData from '../_components/WrittenData'
import Header from '../../_global/outlines/Header'
import Footer from '../../_global/outlines/Footer'
import Padding from '../../_global/components/padding-top'
import { useState } from 'react'

export default function MypageContainer() {
  const [profileOpen, setProfileOpen] = useState(false)
  return (
    <UserOnlyContainer>
      <Header isOpen={profileOpen} setIsOpen={setProfileOpen} />
      <Padding />
      <MainTitle border={'true'} borderthickness="1px" center={'true'}>
        마이페이지
      </MainTitle>
      <UserInfo />
      <ContentBox>
        <WrittenList>
          <WrittenData />
        </WrittenList>
      </ContentBox>
      <Footer />
    </UserOnlyContainer>
  )
}
