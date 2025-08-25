import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import KakaoApi from '../../_services/kakaoApi'
import NaverApi from '../../_services/naverApi'
import { fetchSSR } from '@/app/_global/libs/utils'

export async function GET(request: NextRequest) {
  const channel = request.nextUrl.pathname.split('/')[3].toUpperCase()
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const api = channel === 'NAVER' ? new NaverApi() : new KakaoApi()

  let redirectUrl = searchParams.get('state') ?? '/'
  
  redirectUrl += redirectUrl.includes('?') ? '&' : '?'
  redirectUrl += 'reload=true'

  try {
    if (!code) {
      throw new Error('인증코드 누락')
    }

    const token = await api.getToken(code)
    if (!token) {
      throw new Error('Access Token 발급 실패')
    }

    const id = await api.getProfile(token)
    const res = await fetchSSR('/member/social/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        socialChannel: channel,
        socialToken: id,
      }),
    })

    if (res.status === 200) {
      // 로그인 처리
      const token = await res.text()
      const cookie = await cookies()
      cookie.set('token', token, {
        httpOnly: true,
        path: '/',
      })
    } else {
      // 회원이 존재하지 않는 경우, 소셜 가입을 진행
      redirectUrl = `/member/join?channel=${channel}&token=${id}`
    }
  } catch (err) {
    console.error(err)
    redirect(`/member/login?redirectUrl=${redirectUrl}`)
  }

  redirect(redirectUrl)
}