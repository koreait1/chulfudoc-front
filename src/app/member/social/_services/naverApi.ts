import SocialApi from './SocialApi'

export default class NaverApi implements SocialApi {
  async getToken(code: string) {
    return null
  }

  async getProfile(token: string) {
    return null
  }

  getUrl(redirectUrl: string = '/') {
    return ''
  }
}
