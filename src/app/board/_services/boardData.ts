import type { BoardDataType } from '../_types/BoardType'
import { v4 as uuid } from 'uuid'

export async function get(seq?: number) {
  'use server'
  //if (seq) {
  // 게시글 조회
  //} else {
  // 게시글 등록을 위한 초기 데이터
  return {
    mode: 'write',
    bid: '',
    gid: uuid(),
    category: '',
    poster: '',
    guestPw: '',
    subject: '',
    content: '',
    notice: false,
    secret: false,
    guest: false,
    editorImages: [],
    attachFiles: [],
  }
  //}
}
