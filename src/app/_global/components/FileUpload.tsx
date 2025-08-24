'use client'
import React, { useCallback } from 'react'
import { MdOutlineFileUpload } from 'react-icons/md'
import { Button } from './Buttons'
import useFetchCSR from '../hooks/useFetchCSR'

type FileType = {
  gid: string | number
  location?: string | number
  single?: boolean
  imageOnly?: boolean
  callback?: (items: Array<any>) => void
}

const FileBox = ({ gid, location, single, imageOnly, callback }: FileType) => {
  const FetchCSR = useFetchCSR()

  const onUploadClick = useCallback(() => {
    const fileEl = document.createElement('input')
    fileEl.type = 'file'
    fileEl.multiple = single ? false : true
    if (imageOnly) {
      fileEl.accept = 'image/*'
    }
    fileEl.click()
    fileEl.removeEventListener('change', fileUploadHandler)
    fileEl.addEventListener('change', fileUploadHandler)

    /**
     * 파일을 선택하면 업로드 처리
     * @param e
     */
    function fileUploadHandler(e) {
      const files = e.target.files
      const formData = new FormData()
      formData.append('gid', '' + gid)
      if (location) {
        formData.append('location', '' + location)
      }

      if (single) {
        formData.append('single', 'true')
      }

      if (imageOnly) {
        formData.append('imageOnly', 'true')
      }

      for (const file of files) {
        formData.append('file', file)
      }
      FetchCSR('/file/upload', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((items) => {
          if (typeof callback === 'function') {
            callback(items)
          }
        })
    }
  }, [FetchCSR, gid, location, imageOnly, single, callback])

  return (
    <>
      <Button type="button" onClick={onUploadClick}>
        <MdOutlineFileUpload />
        파일 업로드
      </Button>
    </>
  )
}

export default React.memo(FileBox)
