import styled, { createGlobalStyle } from "styled-components"

export const PageWrapper = createGlobalStyle`

  body{
    width: 100%;
    background-color: #FFF8E1;
  }
`

export const PageMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  alignItems: center;

  padding-bottom: 45px;

  height: 100vh;

  line-height: 0.95;

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
    letter-spacing: -0.06em;
  }
`