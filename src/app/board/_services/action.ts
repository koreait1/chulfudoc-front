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
