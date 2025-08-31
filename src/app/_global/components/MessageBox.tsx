import React from 'react'
import styled from 'styled-components'
import MessageType from '../types/MessageType'
import color from '../styles/color'
import fontSize from '../styles/fontsize'
const { normal } = fontSize

const StyledMessage = styled.div`
  font-size: ${normal};
  color: ${({ color: c }) => (c ? color[c] : c)};
  margin: 2px 0 0 0;
  text-align: left;
  padding: 2px 0 0 6px;
  box-shadow: none;
  border-radius: 0;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 4px;
`

const MessageBox = ({ children, color, message }: MessageType) => {
  if (children) message = children
  message = Array.isArray(message) ? message : message ? [message] : []
  if (message.length === 0) return <></>

  return message.map((m, i) => (
    <StyledMessage
      className="message"
      key={i + '-' + m}
      color={color ?? 'primary'}
    >
      {m}
    </StyledMessage>
  ))
}

export default React.memo(MessageBox)
