import SocialApi from './socialApi'

export default class NaverApi implements SocialApi {
  private state?: string

  constructor(
    private apiKey: string | undefined = process.env.NEXT_PUBLIC_NAVER_API_KEY,
    private apiSecret: string | undefined = process.env.NEXT_PUBLIC_NAVER_API_SECRET,
    private redirectUri: string = `${process.env.NEXT_PUBLIC_DOMAIN}/member/social/naver/callback`,
  ) {}

  async getToken(code: string) {
    const formData = new FormData()
    formData.append('grant_type', 'authorization_code')
    formData.append('client_id', this.apiKey ?? '')
    formData.append('client_secret', this.apiSecret ?? '')
    formData.append('code', code)
    formData.append('state', this.state ?? '')

    const res = await fetch('https://nid.naver.com/oauth2.0/token', {
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
    const res = await fetch('https://openapi.naver.com/v1/nid/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.status === 200) {
      const data = await res.json()
      if (data.resultcode === '00') {
        return data.response.id
      }
    }

    return null
  }

  getUrl(redirectUrl: string = '/') {
    redirectUrl = redirectUrl ? redirectUrl : '/'
    this.state = redirectUrl
    return `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${this.apiKey}&state=${redirectUrl}&redirect_uri=${this.redirectUri}`
  }
}