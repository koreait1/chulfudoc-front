'use client'
import { useCallback, useEffect, useState } from 'react'
import LayerPopup from '../components/LayerPopup'
import GERMapContainer from '@/app/tmap/_containers/GERMapContainer'
import color from '../styles/color'
import styled from 'styled-components'
import fontSize from '../styles/fontsize'

const { primary } = color
const { extra } = fontSize

const StyledHospital = styled.div`
  margin: 0;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const StyledButton = styled.button`
  position: absolute;  

  width: 240px;
  height: 60px;
  border: 0;
  border-radius: 50px;
  cursor: pointer;
  border-radius: 50px;
  margin-top: 15px;
  
  bottom: 47.5%;
  left: 50%;
  transform: translateX(-50%);

  font-family: "Anton", sans-serif !important;
  font-weight: 400;
  font-style: normal;
  font-size: ${extra};

  text-align: center;
  letter-spacing: 0.05em;

  background-color: #000;
  color: ${primary};

  & + & {
    margin-left: 5px;
  }

  svg {
    margin-right: 10px;
  }

  &:disabled {
    opacity: 0.7;
  }

  transition: all 0.2s ease;

  &:hover {
    background-color: #222;
    transform: translateX(-50%) scale(1.05);
  }
`

type HospitalPopup = {
  isOpen: boolean
  setIsOpen: any
}

export default function HosptialPopup({isOpen, setIsOpen}: HospitalPopup) {
  
  const popIconOpen = useCallback(() => {
    const btnValue = !isOpen
    setIsOpen(btnValue)
  }, [isOpen])

  return (
    <StyledHospital>
      <StyledButton type="button" onClick={popIconOpen}>
        FIND HOSPITAL
      </StyledButton>
      <LayerPopup
        isOpen={isOpen}
        onClose={popIconOpen}
        width={'80%'}
        height={'800px'}
      >
        <GERMapContainer />
      </LayerPopup>
    </StyledHospital>
  )
}
