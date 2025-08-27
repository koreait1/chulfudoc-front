export type AuthorityType = 'ALL' | 'MEMBER' | 'ADMIN'
export type SkinType = 'default' | 'gallery'

export type BoardConfigType = {
  mode?: 'register' | 'update'
  chk?: boolean
  bid: string
  name: string
  rowsForPage: number
  pageCount: number
  skin: SkinType
  category?: string
  active: boolean
  editor: boolean
  imageUpload: boolean
  attachFile: boolean
  comment: boolean
  afterWritingRedirect: boolean
  showViewList: boolean
  listAuthority: AuthorityType
  viewAuthority: AuthorityType
  writeAuthority: AuthorityType
  commentAuthority: AuthorityType
}

export type BoardType = {
  board: BoardConfigType
}

export type BoardFormType = {
  data: BoardDataType
  errors: any
  pending: boolean
  action: (errors: any, formData: FormData) => any
} & BoardType

export type BoardDataType = {
  mode?: string
  bid: string
  seq?: number
  gid: string
  category?: string
  poster: string
  guestPw?: string
  subject: string
  content: string
  notice?: boolean
  secret?: boolean
  guest?: boolean
  editorImages?: Array<any>
  attachFiles?: Array<any>
}

export type BoardListType = {} & BoardType
