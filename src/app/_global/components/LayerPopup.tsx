import Modal from 'react-modal'
import React from 'react'
import styled from 'styled-components'
import { FaRegWindowClose } from 'react-icons/fa'
import fontSize from '../styles/fontsize'
import color from '../styles/color'
const { big } = fontSize
const { dark } = color
Modal.setAppElement('#body')
type LayerPopupType = {
  children: React.ReactNode
  title?: string
  isOpen: boolean
  onClose: () => void
  width?: number
  height?: number
}
const Wrapper = styled.div<{ width?: number; height?: number }>`
  width: ${({ width }) => (width ? width : 300)}px;
  height: ${({ height }) => height && `${height}px`};
  h2 {
    margin: 0 0 20px;
    padding: 0 10px 12px;
    font-size: ${big};
    border-bottom: 1px solid ${dark};
    text-align: center;
    font-weight: 500;
  }
  .close {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 2.2rem;
    color: ${dark};
    cursor: pointer;
  }
`
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroud: '#fff',
    borderRadius: '30px',
  },
}
const LayerPopup = ({
  children,
  title,
  onClose,
  isOpen,
  width,
  height,
}: LayerPopupType) => {
  return (
    isOpen && (
      <Modal isOpen={isOpen} style={customStyles}>
        <Wrapper width={width} height={height}>
          <FaRegWindowClose onClick={onClose} className="close" />
          {title && <h2>{title}</h2>}
          {children}
        </Wrapper>
      </Modal>
    )
  )
}
export default React.memo(LayerPopup)
