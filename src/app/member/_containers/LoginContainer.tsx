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
import useAlertDialog from '@/app/_global/hooks/useAlertDialog'
import styled from 'styled-components'

const StyledDiv = styled.div`
  margin: 40px auto 80px;
  padding: 50px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

type FormType = {
  userId: string
  password: string
  redirectUrl?: string
}

const kakaoApi = new KakaoApi()
const naverApi = new NaverApi()
const alertDialog = useAlertDialog()

const LoginContainer = ({ redirectUrl }: { redirectUrl?: string }) => {
  const [errors, action, pending] = useActionState<any, any>(processLogin, {})
  const [form, setForm] = useState<FormType>({
    userId: '',
    password: '',
    redirectUrl: redirectUrl ?? '',
  })

  const searchParams = useSearchParams()
  
  const alertDialog = useAlertDialog()

  useEffect(() => {
    if (errors === '탈퇴한 계정입니다.') {
      alertDialog({
        title: '로그인 실패',
        text: '탈퇴한 계정입니다.',
        icon: 'error',
      });
    }
  }, [errors, alertDialog]);

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

  useEffect(() => {
    if (typeof errors === 'string' && errors.includes('탈퇴한 회원')) {
      alertDialog({
        title: '로그인 실패',
        text: '탈퇴한 회원입니다. 로그인할 수 없습니다.',
        icon: 'error',
      });
    }
  }, [errors]);


  const onChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  return (
    <>
      <StyledDiv>
        <LoginForm
          errors={errors}
          action={action}
          pending={pending}
          form={form}
          onChange={onChange}
        />
        <div className="socialbtn">
          <a
            href={kakaoLoginUrl}
            style={{ display: 'block', marginBottom: '10px' }}
          >
            <Image src={kakaoLoginButton} alt="카카오 로그인" width={400} />
          </a>
          <a href={naverLoginUrl}>
            <Image src={naverLoginButton} alt="네이버 로그인" width={400} />
          </a>
        </div>
      </StyledDiv>
    </>
  )
}

export default React.memo(LoginContainer)
