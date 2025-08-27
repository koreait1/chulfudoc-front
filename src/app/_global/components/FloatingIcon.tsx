import React from "react";
import styled, { css } from "styled-components";
import { GoMoveToTop } from "react-icons/go";

type FloatingIconType = {
    visible?: string
    onClick?: () => void;
}

const IconWrapper = styled.div<FloatingIconType>`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background-color: #FFD93D;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: transform 0.3s, opacity 0.3s;
  z-index: 999;

  ${({ visible }) =>
    visible == "true"
        ? css`
        opacity: 1;
        transform: translateY(0);
        `
        : css`
        opacity: 0;
        transform: translateY(20px);
        `
    }

  &:hover {
    transform: scale(1.1);
  }
`;

const FloatingIcon = ({ visible, onClick }: FloatingIconType) => {

    return( 
        <IconWrapper onClick={onClick} visible={visible}>
            <GoMoveToTop style={{ width: '25px', height: 'auto' }} />
        </IconWrapper>
    )
};

export default React.memo(FloatingIcon);
