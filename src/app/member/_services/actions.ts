'use server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

/**
 * 회원가입 처리
 *
 */
export async function processJoin(errors, formData: FormData) {
  errors = {}
  const params: any = {}

  // 필요한 필드와 값만 추출
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('$ACTION_')) continue
    let _value: string | boolean = value.toString()
    if (['true', 'false'].includes(_value)) {
      _value = _value === 'true'
    }

    params[key] = _value
  }

  let hasErrors: boolean = false
  // 필수 항목 검증 S
  const requiredFields = {
    email: '이메일을 입력하세요.',
    password: '비밀번호를 입력하세요.',
    confirmPassword: '비밀번호를 확인하세요.',
    name: '회원이름을 입력하세요.',
    mobile: '휴대전화번호를 입력하세요.',
    termsAgree: '회원가입 약관에 동의하세요.',
  }

  for (const [field, message] of Object.entries(requiredFields)) {
    if (
      !params[field] ||
      (typeof params[field] === 'string' && !params[field].trim())
    ) {
      hasErrors = true

      errors[field] = errors[field] ?? []
      errors[field].push(message)
    }
  }
  // 필수 항목 검증 E

  // 비밀번호, 비밀번호 확인 일치 여부
  const password = params.password?.trim()
  if (password && password !== params.confirmPassword?.trim()) {
    errors.confirmPassword = errors.confirmPassword ?? []
    errors.confirmPassword.push('비밀번호가 일치하지 않습니다.')
    hasErrors = true
  }

  // 회원 가입 처리를 위해  API 서버에 요청
  try {
    const apiUrl = `${process.env.API_URL}/member`
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    // API 백앤드에서 검증 실패시 메세지
    if (res.status !== 201) {
      const { messages } = await res.json()
      return messages
    }
  } catch (err: any) {
    return { global: err?.message }
  }

  // 검증 실패시에는 에레 메세지를 출력하기 위한 상태값을 반환
  if (hasErrors) {
    return errors
  }

  // 회원가입 완료시 로그인 페이지로 이동
  redirect('/member/login')
}

/**
 * 로그인 처리
 *
 * @param errors
 * @param formData
 */
export async function processLogin(errors, formData: FormData) {
  errors = {}
  let hasErrors: boolean = false
  const params: { email?: string; password?: string; redirectUrl?: string } = {
    email: formData.get('email')?.toString(),
    password: formData.get('password')?.toString(),
  }
  // 유효성 검사 S
  if (!params.email || !params.email.trim()) {
    errors.email = '이메일을 입력하세요.'
    hasErrors = true
  }

  if (!params.password || !params.password.trim()) {
    errors.password = '비밀번호를 입력하세요.'
    hasErrors = true
  }
  // 유효성 검사 E

  if (hasErrors) {
    return errors
  }

  // API 백앤드로 요청을 보냄
  const apiUrl = `${process.env.API_URL}/member/token`
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (res.status === 200) {
    // 로그인 성공, 토큰 발급 성공
    const token = await res.text()
    // 로그인 처리 - 토큰을 쿠키에 저장
    const cookie = await cookies()
    cookie.set('token', token, {
      httpOnly: true,
      path: '/',
    })
  } else {
    // 로그인 실패
    const json = await res.json()
    return json.messages.global ? json.messages : { global: json.messages }
  }
}
