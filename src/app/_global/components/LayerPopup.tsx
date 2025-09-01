import Modal from 'react-modal'
import React from 'react'
import styled from 'styled-components'
import fontSize from '../styles/fontsize'
import color from '../styles/color'
import { MdClose } from 'react-icons/md'

const { big } = fontSize
const { dark } = color

Modal.setAppElement('#body')

type LayerPopupType = {
  children: React.ReactNode
  title?: string
  isOpen: boolean
  onClose: () => void
  width?: string | number
  height?: string
  top?: string
  right?: string
}

const Wrapper = styled.div`
  max-height: calc(100%);
  overflow-y: auto;

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
  ul {
    text-align: center;
    li {
      display: inline-block;
    }
    img {
      border: 1px solid #000;
      border-radius: 50%;
    }
    & + span {
      width: 100px;
      display: block;
      text-align: right;
      margin: 0 auto;
      span {
        font-size: ${big};
      }
    }
    & ~ a {
      display: block;
      text-align: center;
      margin-top: 10px;
      button {
        margin: 0;
        svg {
          position: absolute;
          left: 40px;
          margin-top: 4px;
        }
      }
    }
  }
`
const LayerPopup = ({children, title, onClose, isOpen, top, right, width, height,}: LayerPopupType) => {
  const customStyles = {
    content: {
      top: top ?? '50%',
      right: right ?? '50%',
      left: 'auto',
      bottom: 'auto',
      transform: 'translate(50%, -50%)',
      background: '#fff',
      borderRadius: '30px',
      width: width ?? '90%',
      height: height ?? '70%',
    },
  }
  return (
    isOpen && (
      <Modal
        isOpen={isOpen}
        style={customStyles}
        top={top}
        right={right}
        width={width}
        height={height}
        onWheel={(e) => e.stopPropagation()}
      >
        {title && <h2>{title}</h2>}
        <Wrapper>
          <MdClose onClick={onClose} className="close" />
          {children}
        </Wrapper>
      </Modal>
    )
  )
}
export default React.memo(LayerPopup)
