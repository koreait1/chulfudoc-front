// 네이버도 number면 string지우기
type ProfileType = {
  id: number | string
}

export default interface SocialApi {
  /**
   * authorization code를 가지고 access token 발급(회원 프로필 정보를 접근하기 위한 승인 코드)
   * @param code : authorizaion code
   * @returns
   */
  getToken: (code: string) => string

  /**
   * 회원의 프로필 정보
   * 
   * @param token : access token
   * @returns
   */
  getProfile: (token: string) => ProfileType

  /**
   * 인증 서버에서 client_id를 통해서 authorization code를 발급받을 수 있는 URL 생성
   * authorization code ; access token을 발급받기 위한 인증 코드
   * @param redirectUrl : 없으면 메인 페이지, 있으면 로그인 처리 후 지정된 URL로 이동
   * @returns
   */
  getUrl: (redirectUrl?: string) => string
}
