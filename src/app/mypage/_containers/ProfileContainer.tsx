'use client'

import React, {
  useActionState,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react'

import ProfileForm from '../_components/ProfileForm'
import useUser from '@/app/_global/hooks/useUser'
import UserContext from '@/app/_global/contexts/UserContext'
import { processProfile } from '../_services/actions'
import Header from '@/app/_global/outlines/Header'
import Padding from '@/app/_global/components/padding-top'
import { MainTitle } from '@/app/_global/components/TitleBox'

const ProfileContainer = () => {
  const { loggedMember } = useUser()
  const [form, setForm] = useState(loggedMember)
  const [errors, action, pending] = useActionState<any, any>(processProfile, {})
  const {
    actions: { setLoggedMember },
  } = useContext(UserContext)

  useEffect(() => {
    //회원 수정이 완료된 경우 -> 회원 정보 업데이트
    if (!errors.done) {
      return
    }
    setLoggedMember(errors)

    location.replace('/mypage')
  }, [errors, setLoggedMember])

  const onChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  const fileUploadCallback = useCallback((items) => {
    setForm((prev) => ({ ...prev, profileImage: items[0] }))
  }, [])

  const fileDeleteCallback = useCallback(() => {
    setForm((prev) => {
      const data = { ...prev }
      delete data.profileImage
      return data
    })
  }, [])
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <>
      <Header isOpen={profileOpen} setIsOpen={setProfileOpen} />
      <Padding />
      <MainTitle border={''} center={'true'}>
        회원정보 수정
      </MainTitle>
      <ProfileForm
        form={form}
        errors={errors}
        action={action}
        pending={pending}
        onChange={onChange}
        fileUploadCallback={fileUploadCallback}
        fileDeleteCallback={fileDeleteCallback}
      />
    </>
  )
}

export default React.memo(ProfileContainer)
