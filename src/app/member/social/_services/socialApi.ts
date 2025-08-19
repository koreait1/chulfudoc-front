// 네이버도 number면 string지우기
type ProfileType = {
    id: number | string
}

export default interface SocialApi {
  channel: 'KAKAO' | 'NAVER'
  getToken: (code: string) => string
  getProfile: (token: string) => ProfileType
}
