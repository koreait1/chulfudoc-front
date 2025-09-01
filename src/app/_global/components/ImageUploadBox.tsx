'use client'
import React, { useCallback } from 'react'
import { MdFileUpload } from 'react-icons/md'
import { Button } from './Buttons'
import styled from 'styled-components'
import useFetchCSR from '../hooks/useFetchCSR'
import useAlertDialog from '../hooks/useAlertDialog'

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

export default function ImageUploadBox({ gid, callback }: Props) {
  const fetchCSR = useFetchCSR()
  const alertDialog = useAlertDialog()

  const onUploadClick = useCallback(() => {
    const fileEl = document.createElement('input')
    fileEl.type = 'file'
    fileEl.multiple = true
    fileEl.accept = 'image/*'
    fileEl.click()
    fileEl.addEventListener('change', async (e: any) => {
      const files = e.target.files
      const formData = new FormData()
      formData.append('gid', '' + gid)
      formData.append('imageOnly', 'true')
      for (const file of files) {
        if (file.type.indexOf('image/') === -1) {
          alertDialog({ text: '이미지 파일만 업로드 가능합니다.' })
          return
        }
        formData.append('file', file)
      }
      const res = await fetchCSR('/file/upload', {
        method: 'POST',
        body: formData,
      })
      const items = await res.json()
      callback?.(items)
    })
  }, [gid, fetchCSR, alertDialog, callback])

  return (
    <Button type="button" color="warning" width={180} onClick={onUploadClick}>
      <UploadWrapper>
        <MdFileUpload size={24} />
        <div>이미지 업로드</div>
      </UploadWrapper>
    </Button>
  )
}
