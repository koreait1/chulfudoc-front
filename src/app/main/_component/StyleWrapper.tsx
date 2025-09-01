import styled, { createGlobalStyle } from "styled-components"

export const PageWrapper = createGlobalStyle`
  body{
    width: 100%;
  }
`

export const PageMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-top: 37px;

  height: 100vh;

  line-height: 0.95;

  color: #FFEA00;
  text-align: center;
  
  font-size: 11rem;

  .line_start{
    padding-top: 25px;
  }

  .line_end{
    margin-bottom: 10px;
  }

  .line_start, .line_end, .highlight{
    font-family: "Anton", sans-serif !important;
    font-weight: 1000;
    font-style: normal;
    z-index: 20;
  }

  @media (max-width: 1150px) {
    font-size: 10rem;
  }

   @media (max-width: 820px) {
    font-size: 8.5rem;
  }

  @media (max-width: 650px) {
    font-size: 6rem;
  }

  @media (max-width: 500px) {
    font-size: 4rem;
  }

  .highlight {
    letter-spacing: -0.06em;
  }
`