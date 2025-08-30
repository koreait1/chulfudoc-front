'use server'
import { toPlainObj } from '@/app/_global/libs/commons'
import { fetchSSR } from '@/app/_global/libs/utils'
import { getBoardConfig } from './boardConfig'
import { redirect } from 'next/navigation'

/**
 * 게시글 등록, 수정 처리
 * @param errors
 * @param formData
 */
export async function processUpdate(errors: any, formData: FormData) {
  errors = {}
  const params = toPlainObj(formData)

  let hasErrors: boolean = false

  const board = await getBoardConfig(params.bid)
  if (!board.bid) {
    errors.global = '게시판을 찾을 수 없습니다.'
    hasErrors = true
  }

  // 유효성 검사 S
  const requiredFields = {
    bid: '잘못된 접근입니다.',
    gid: '잘못된 접근입니다.',
    poster: '작성자를 입력하세요.',
    subject: '제목을 입력하세요.',
    content: '내용을 입력하세요.',
  }

  for (const [field, message] of Object.entries(requiredFields)) {
    if (!params[field]?.trim()) {
      errors[field] = message
      hasErrors = true
    }
  }

  const { mode } = params
  if (mode === 'update' && !params.seq) {
    errors.seq = '잘못된 접근입니다.'
    hasErrors = true
  }

  if (hasErrors) {
    return errors
  }
  // 유효성 검사 E

  // 요청 처리
  const res = await fetchSSR('/board/update', {
    method: mode === 'update' ? 'PATCH' : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  const data = await res.json()
  let redirectUrl = `/board/list/${board.bid}`
  if ([200, 201].includes(res.status)) {
    // 게시글 등록, 수정 성공
    const { afterWritingRedirect } = board
    redirectUrl = afterWritingRedirect ? `/board/view/${data.seq}` : redirectUrl
  } else {
    return data.messages
  }

  redirect(redirectUrl)
}

/**
 * 비회원 비밀번호 확인 처리
 *
 * @param errors
 * @param formData
 */
export async function processPassword(errors: any, formData: FormData) {
  errors = {}
  const params = toPlainObj(formData)
  let hasErrors: boolean = false
  const { seq, mode, password } = params
  if (
    !seq ||
    !mode ||
    !['update', 'delete', 'comment_update', 'comment_delete'].includes(mode)
  ) {
    errors.global = '잘못된 접근입니다.'
    hasErrors = true
  }

  if (!password?.trim()) {
    errors.password = '비밀번호를 입력하세요.'
    hasErrors = true
  }

  if (hasErrors) {
    return errors
  }

  const requestUrl = mode.startsWith('comment_')
    ? `/board/password/comment/${seq}`
    : `/board/password/${seq}`

  const res = await fetchSSR(requestUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (res.status !== 204) {
    // 비회원 비밀번호 인증 실패
    const data = await res.json()
    return { password: data.messages }
  }

  let redirectUrl: string = '/board/'
  switch (mode) {
    case 'delete':
      redirectUrl += `delete/${seq}`
      break
    case 'comment_delete':
      redirectUrl += `comment/delete/${seq}`
      break
    case 'comment_update':
      redirectUrl += `comment/${seq}`
      break
    default:
      redirectUrl += `update/${seq}`
  }

  redirect(redirectUrl)
}

/**
 * 댓글 등록, 수정
 *
 * @param errors
 * @param formData
 */
export async function processComment(errors: any, formData: FormData) {
  errors = {}
  const params = toPlainObj(formData)
  let hasErrors: boolean = false

  // 유효성 검사
  const { seq, boardDataSeq, commenter, content, mode, guest, guestPw } = params
  if (!boardDataSeq || !mode || (mode === 'comment_update' && !seq)) {
    errors.global = '잘못된 접근입니다.'
    hasErrors = true
  }

  if (!commenter?.trim()) {
    errors.commenter = '작성자를 입력하세요.'
    hasErrors = true
  }

  if (!content?.trim()) {
    errors.content = '댓글을 입력하세요.'
    hasErrors = true
  }

  if (guest && !guestPw?.trim()) {
    errors.guestPw = '비밀번호를 입력하세요.'
    hasErrors = true
  }

  if (hasErrors) {
    return errors
  }

  const res = await fetchSSR('/board/comment', {
    method: mode === 'comment_update' ? 'PATCH' : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  const data = await res.json()
  if (![200, 201].includes(res.status)) {
    // 댓글 등록 또는 수정에 실패한 경우
    return data.messages
  }

  // 성공시 -> /board/view/게시글번호#comment_댓글번호
  redirect(`/board/view/${params.boardDataSeq}#comment_${data.seq}`)
}
