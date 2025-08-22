import React, { useCallback } from 'react'
import { FaDownload, FaRegWindowClose } from 'react-icons/fa'
import styled from 'styled-components'
import useFetchCSR from '../hooks/useFetchCSR'
import useConfirmDialog from '../hooks/useConfirmDialog'
import color from '../styles/color'
import fontSize from '../styles/fontsize'
const { light } = color
const { small } = fontSize
type FileType = {
  items: any
  callback?: (item: any) => void
}
const StyledItems = styled.ul`
  li {
    padding: 8px 10px;
    background: ${light};
    font-size: ${small};
    display: flex;
    a {
      flex-glow: 1;
      svg {
        margin-left: 10px;
      }
    }
    .icon-remove {
      cursor: pointer;
    }
    svg {
      vertical-align: center;
    }
  }
  li + li {
    border-top: 1px solid #ccc;
  }
`
const FileItems = ({ items, callback }: FileType) => {
  const fetchCSR = useFetchCSR()
  const confirmDialog = useConfirmDialog()
  const onRemove = useCallback(
    (seq) => {
      confirmDialog({
        text: '정말 삭제하시겠습니까?',
        confirmCallback: () => {
          fetchCSR(`/file/delete/${seq}`, { method: 'DELETE' })
            .then((res) => res.json())
            .then((item) => {
              // 삭제 후 후속 처리
              if (typeof callback === 'function') {
                callback(item)
              }
            })
        },
      })
    },
    [fetchCSR, callback, confirmDialog],
  )
  items = Array.isArray(items) ? items : items ? [items] : []
  if (items.length === 0) return <></>
  return (
    <StyledItems>
      {items.map(({ seq, fileName, fileDownloadUrl }) => (
        <li key={'file-' + seq}>
          <a href={fileDownloadUrl}>
            #{fileName}
            <FaDownload className="icon-download" />
          </a>
          <FaRegWindowClose
            className="icon-remove"
            onClick={() => onRemove(seq)}
          />
        </li>
      ))}
    </StyledItems>
  )
}

export default React.memo(FileItems)
