import type { BoardConfigType } from '../_types/BoardType'
import type CommonSearchType from '@/app/_global/types/CommonSearchType'
import { fetchSSR } from '@/app/_global/libs/utils'
import { toQueryString } from '@/app/_global/libs/commons'

export const defaultData: BoardConfigType = {
  mode: 'register',
  bid: '',
  name: '',
  rowsForPage: 20,
  pageCount: 10,
  skin: 'default',
  category: '',
  active: false,
  editor: false,
  imageUpload: false,
  attachFile: false,
  comment: false,
  afterWritingRedirect: false,
  showViewList: false,
  listAuthority: 'ALL',
  viewAuthority: 'ALL',
  writeAuthority: 'ALL',
  commentAuthority: 'ALL',
}

export async function getBoardConfig(bid?: string): Promise<BoardConfigType> {
  'use server'
  if (bid) {
    const res = await fetchSSR(`/board/config/${bid}`)
    if (res.status === 200) {
      const _data = await res.json()
      _data.mode = 'update'
      return _data
    }
  }

  return defaultData
}

/**
 * 게시판 목록 조회
 *
 * @param searchParams
 */
export async function getBoardList(searchParams: CommonSearchType): Promise<{
  items?: Array<BoardConfigType>
  pagination?: any
}> {
  'use server'
  const qs = toQueryString(searchParams)
  const res = await fetchSSR(`/board/configs/all${qs}`)

  if (res.status === 200) {
    return await res.json()
  }
  return {}
}

const isActiveVal = (v: any) =>
  v === true ||
  v === 1 ||
  v === '1' ||
  (typeof v === 'string' &&
    (v.toUpperCase() === 'Y' || v.toLowerCase() === 'true'))

const allowListAuthority = (v: any) => {
  const s = String(v ?? 'ALL')
    .trim()
    .toUpperCase()

  return s === 'ALL' || s === 'MEMBER'
}

export async function getBoardTabsData(): Promise<BoardConfigType[]> {
  'use server'
  const res = await fetchSSR(`/board/configs`)
  if (res.status !== 200) return []
  const data = await res.json()
  const items: BoardConfigType[] = data.items ?? data ?? []
  return items.filter(
    (b: any) => isActiveVal(b.active) && allowListAuthority(b.listAuthority),
  )
}
