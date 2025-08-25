import SocialApi from './SocialApi'

export default class KakaoApi implements SocialApi {
  constructor(
    private apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_API_KEY,
    private redirectUri: string = `${process.env.NEXT_PUBLIC_DOMAIN}/member/social/kakao/callback`,
  ) {}

  async getToken(code: string) {
    const formData = new FormData()
    formData.append('grant_type', 'authorization_code')
    formData.append('client_id', this.apiKey ?? '')
    formData.append('code', code)
    formData.append('redirect_uri', this.redirectUri)

    const res = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      body: formData,
    })

    if (res.status === 200) {
      const { access_token } = await res.json()
      return access_token
    }

    return null
  }

  async getProfile(token: string) {
    const res = await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.status === 200) {
      const { id } = await res.json()
      return { id }
    }

    return null
  }

  getUrl(redirectUrl: string = '/') {
    return `https://kauth.kakao.com/oauth/authorize?client_id=${this.apiKey}&redirect_uri=${this.redirectUri}&response_type=code&state=${redirectUrl}`
  }
}
