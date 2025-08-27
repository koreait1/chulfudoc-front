'use client'
import React, { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { GoMoveToTop } from "react-icons/go";

type FloatingIconType = {
    visible?: string
    bottom?: number
    children?: React.ReactNode
}

const IconWrapper = styled.div<FloatingIconType>`
  position: fixed;
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

   ${({ bottom }) => css`
    bottom: ${bottom ?? 30}px;
  `}

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

const FloatingIcon = ({bottom, children}: FloatingIconType) => {
    const [visible, setIsVisible] = useState("false");
    let scrollThreshold = 75;

    const goTop = useCallback(() => {
        window.scrollTo({
        top: 0,           
        behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const data = window.scrollY > scrollThreshold;
            setIsVisible(String(data));
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollThreshold]);

    return( 
        <IconWrapper onClick={goTop} visible={visible} bottom={bottom}>
            {children}
        </IconWrapper>
    )
};

export default React.memo(FloatingIcon);
