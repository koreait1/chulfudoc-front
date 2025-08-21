'use client'
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import LayerPopup from './LayerPopup'

const ImageItems = styled.ul``

type FileType = {
  items: any
  width?: number
  height?: number
}

const ImageItem = ({ item, width, height }) => {
  const { seq, fileUrl, thumbBaseUrl, fileName, image } = item
  const [open, setOpen] = useState<boolean>(false)
  const onClose = useCallback(() => setOpen(false), [])
  const onShow = useCallback(() => setOpen(true), [])

  return (
    image && (
      <li>
        <Image
          src={`${thumbBaseUrl}&width=${width}&height=${height}&crop=true`}
          alt={fileName}
          width={width}
          height={height}
          onClick={onShow}
        />
        <LayerPopup width={500} isOpen={open} onClose={onClose}>
          <Image
            className="org-image"
            width={500}
            height={500}
            src={fileUrl}
            alt={fileName}
          />
        </LayerPopup>
      </li>
    )
  )
}

const FileImages = ({ items, width, height }: FileType) => {
  items = Array.isArray(items) ? items : items ? [items] : []
  if (items.length === 0) return <></>
  width = width ?? 100
  height = height ?? 100
  return (
    <ImageItems>
      {items.map((item) => (
        <ImageItem
          key={'file-' + item.seq}
          item={item}
          width={width}
          height={height}
        />
      ))}
    </ImageItems>
  )
}

export default React.memo(FileImages)
