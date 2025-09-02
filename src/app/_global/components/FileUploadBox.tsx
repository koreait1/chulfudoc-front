'use client'
import React, { useCallback } from 'react'
import { MdAttachFile } from 'react-icons/md'
import { Button } from './Buttons'
import styled from 'styled-components'
import useFetchCSR from '../hooks/useFetchCSR'

const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  svg {
    margin-bottom: 6px;
  }
  div {
    font-weight: 600;
  }
`

type Props = {
  gid: string | number
  callback?: (items: Array<any>) => void
}

export default function FileUploadBox({ gid, callback }: Props) {
  const fetchCSR = useFetchCSR()

  const onUploadClick = useCallback(() => {
    const fileEl = document.createElement('input')
    fileEl.type = 'file'
    fileEl.multiple = true
    fileEl.click()
    fileEl.addEventListener('change', async (e: any) => {
      const files = e.target.files
      const formData = new FormData()
      formData.append('gid', '' + gid)
      for (const file of files) {
        formData.append('file', file)
      }
      const res = await fetchCSR('/file/upload', {
        method: 'POST',
        body: formData,
      })
      const items = await res.json()
      callback?.(items)
    })
  }, [gid, fetchCSR, callback])

  return (
    <Button type="button" color="dark" width={180} onClick={onUploadClick}>
      <UploadWrapper>
        <MdAttachFile size={22} />
        <div>파일 업로드</div>
      </UploadWrapper>
    </Button>
  )
}
