import styled, { createGlobalStyle } from "styled-components"

export const PageWrapper = createGlobalStyle`

  body{
    background-color: #FFF8E1;
  }
`

export const PageMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  alignItems: center;

  line-height: 0.95;
  margin: 25px;

  color: #E6C200;
  text-align: center;
  
  font-size: 13rem;
  .line_start, .line_end, .highlight{
    font-family: "Anton", sans-serif !important;
    font-weight: 1000;
    font-style: normal;
    
  }

  @media (max-width: 1150px) {
    font-size: 9rem;
  }

  @media (max-width: 768px) {
    font-size: 5rem;
  }

  .highlight {
    color: #2E2E2E;
    letter-spacing: -0.08em;
  }
`