'use client'

import styled from 'styled-components'

interface Props {
  width?: string
  height?: string
}

const LocalLoadingWrapper = styled.div<{ width?: string; height?: string }>`
  position: relative; // 부모 기준으로 위치
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '300px'};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto; // h1과 테이블 사이 띄우기
  background: #f9f9f9; // 필요시 배경
  border-radius: 8px; // 선택 사항
`

export default LocalLoadingWrapper
