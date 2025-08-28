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
import KakaoApi from '../social/_services/KakaoApi'
import NaverApi from '../social/_services/NaverApi'
import kakaoLoginButton from '../../_global/assets/images/kakao_login.png'
import naverLoginButton from '../../_global/assets/images/naver_login.png'
import Link from 'next/link'

type FormType = {
  userId: string
  password: string
  redirectUrl?: string
}

const kakaoApi = new KakaoApi()
const naverApi = new NaverApi()

const LoginContainer = ({ redirectUrl }: { redirectUrl?: string }) => {
  const [errors, action, pending] = useActionState<any, any>(processLogin, {})
  const [form, setForm] = useState<FormType>({
    userId: '',
    password: '',
    redirectUrl: redirectUrl ?? '',
  })

  const searchParams = useSearchParams()

  const kakaoLoginUrl = useMemo(
    () => kakaoApi.getUrl(redirectUrl),
    [redirectUrl],
  )

  const naverLoginUrl = useMemo(
    () => naverApi.getUrl(form.redirectUrl),
    [form.redirectUrl],
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
        <Image src={kakaoLoginButton} alt="카카오 로그인" width={400} />
      </a>
      <a href={naverLoginUrl}>
        <Image src={naverLoginButton} alt="네이버 로그인" width={400} />
      </a>

      <Link href="/member/findid" className="findid">
        아이디 찾기 
      </Link>
    
      <Link href="/member/findpw" className="findpw">
        비밀번호 찾기
      </Link>
    </>
  )
}

export default React.memo(LoginContainer)
