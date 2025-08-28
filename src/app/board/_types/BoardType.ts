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
  categories?: Array<string>
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
  writable?: boolean
  listable?: boolean
  commentable?: boolean
}

export type BoardType = {
  board?: BoardConfigType
}

export type BoardFormType = {
  data: BoardDataType
  errors: any
  pending: boolean
  action: any
  onChange: (e: any) => void
  onToggle: (key: string, value: any) => void
  editorCallback: (editor) => void
  fileUploadCallback: (items: Array<any>) => void
  fileDeleteCallback: (item: any) => void
} & BoardType

export type BoardDataType = {
  mode?: string
  bid?: string
  board?: BoardConfigType
  member?: any
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
  editable?: boolean
  mine?: boolean
  viewCount?: number
  ip?: string
  ua?: string
  plainText?: boolean
  editorImages?: Array<any>
  attachFiles?: Array<any>
  createdAt?: Date
  modifiedAt?: Date
  deletedAt?: Date
}

export type BoardListType = {} & BoardType

export type BoardViewType = {
  data?: BoardDataType
} & BoardType
