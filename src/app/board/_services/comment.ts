import { fetchSSR } from '@/app/_global/libs/utils'
import type { CommentDataType } from '../_types/CommentType'
import { toDate } from '@/app/_global/libs/commons'

export async function get(seq: number) {
  const res = await fetchSSR(`/board/comment/${seq}`)
  if (res.status === 200) {
    const item = await res.json()
    processData(item)

    return item
  }

  return {}
}

/**
 * 댓글 목록
 *
 * @param seq
 * @returns
 */
export async function getList(seq: number) {
  const res = await fetchSSR(`/board/comments/${seq}`)
  if (res.status === 200) {
    const items = await res.json()
    items.forEach((item) => processData(item))

    return items
  }

  return []
}

/**
 * 댓글 한 개 삭제
 * @param seq
 */
export async function deleteComment(seq: number) {
  const res = await fetchSSR(`/board/comment/${seq}`, {
    method: 'DELETE',
  })

  if (res.status === 200) {
    return await res.json()
  }
}

/**
 * 데이터 변환 처리
 *
 * @param item
 */
function processData(item: CommentDataType) {
  item.createdAt = toDate(item.createdAt)
  if (item.modifiedAt) item.modifiedAt = toDate(item.modifiedAt)
  if (item.deletedAt) item.deletedAt = toDate(item.deletedAt)
  item.guestPw = ''
}
