// import type { BoardConfigType } from '../_types/BoardType'
// import type CommonSearchType from '@/app/_global/types/CommonSearchType'
// import { fetchSSR } from '@/app/_global/libs/utils'
// import { toQueryString } from '@/app/_global/libs/commons'
// export const defaultData: MemberConfigType = {
//   puuid: '',
//   name: '',
//   userId: '',
//   email: '',
//   mobile: '',
//   socialToken: '',
// }

// export async function getMemberConfig(puuid?: string): Promise<BoardConfigType> {
//   'use server'
//   if (puuid) {
//     const res = await fetchSSR(`/member/list`)
//     if (res.status === 200) {
//       const _data = await res.json()
//       _data.mode = 'update'
//       return _data
//     }
//   }

//   return defaultData
// }

// /**
//  * 멤버 목록 조회
//  *
//  * @param searchParams
//  */
// export async function getMemberList(searchParams: CommonSearchType): Promise<{
//   items?: Array<BoardConfigType>
//   pagination?: any
// }> {
//   'use server'
//   const qs = toQueryString(searchParams)
//   const res = await fetchSSR(`/board/configs/all${qs}`)

//   if (res.status === 200) {
//     return await res.json()
//   }
//   return {}
// }
