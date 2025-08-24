import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'
import KakaoApi from '../../_services/kakaoApi'
import NaverApi from '../../_services/naverApi'

export async function GET(request: NextRequest) {
  const channel = request.nextUrl.pathname.split('/')[3]
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const redirectUrl = searchParams.get('state') ?? '/'
  const api = channel === 'naver' ? new NaverApi() : new KakaoApi()
  try {
    if (!code) {
      throw new Error('인증코드 누락')
    }

    const token = await api.getToken(code)
    if (!token) {
      throw new Error('Access Token 발급 실패')
    }

    const profile = await api.getProfile(token)
    console.log('profile', profile)

    return NextResponse.json({})
  } catch (err) {
    console.error(err)
    redirect(`/member/login?redirectUrl=${redirectUrl}`)
  }
}
