'use client'
import Image from 'next/image'
import React, {
  useActionState,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import { useSearchParams } from 'next/navigation'
import { processLogin } from '../_services/actions'
import LoginForm from '../_components/LoginForm'
import KakaoApi from 
'@/app/member/social/_services/kakaoApi'
import kakaoLoginButton from '../../_global/assets/images/kakao_login.png'

type FormType = {
  email: string
  password: string
  redirectUrl?: string
}

const kakaoApi = new KakaoApi()

const LoginContainer = ({ redirectUrl }: { redirectUrl?: string }) => {
  const [errors, action, pending] = useActionState<any, any>(processLogin, {})
  const [form, setForm] = useState<FormType>({
    email: '',
    password: '',
    redirectUrl: redirectUrl ?? '',
  })

  const searchParams = useSearchParams()

  const kakaoLoginUrl = useMemo(
    () => kakaoApi.getUrl(redirectUrl),
    [redirectUrl],
  )

  useEffect(() => {
    const redirectUrl = searchParams.get('redirectUrl')?.toString()
    if (!redirectUrl) return

    setForm((prev) => ({ ...prev, redirectUrl }))
  }, [searchParams])

  const onChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  return (
    <>
      <LoginForm
        errors={errors}
        action={action}
        pending={pending}
        form={form}
        onChange={onChange}
      />
      <a href={kakaoLoginUrl}>
        <Image src={kakaoLoginButton} alt="카카오 로그인" />
      </a>
    </>
  )
}

export default React.memo(LoginContainer)
