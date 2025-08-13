import React from 'react'
import styled from 'styled-components'
import MessageType from '../types/MessageType'
import color from '../styles/color'
import fontSize from '../styles/fontsize'
const { normal } = fontSize

const StyledMessage = styled.div`
  font-size: ${normal};
  color: ${({ color: c }) => (c ? color[c] : c)};
  box-shadow: 2px 2px 5px ${({ color: c }) => (c ? color[c] : c)};
  padding: 7px 10px;
  text-align: center;
  margin-top: 3px;
  border-radius: 3px;
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
