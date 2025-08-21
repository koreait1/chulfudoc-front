'use client'
import React, { createElement, useCallback } from 'react'
import { MdOutlineFileUpload } from 'react-icons/md'
import { Button } from './Buttons'

const FileBox = () => {
  const onUploadClick = useCallback(() => {
    const fileEl = document.createElement('input')
    fileEl.type = 'file'
    fileEl.click()
    fileEl.removeEventListener('change', fileUploadHandler)
    fileEl.addEventListener('change', fileUploadHandler)

    /**
     * 파일을 선택하면 업로드 처리
     * @param e
     */
    function fileUploadHandler(e) {
      const files = e.target.files
      console.log('files', files)
    }
  }, [])

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
