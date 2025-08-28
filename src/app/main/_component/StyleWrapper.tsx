import styled, { createGlobalStyle } from "styled-components"

export const PageWrapper = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

  body{
    background-color: #FFF8E1;
  }
`

export const PageMain = styled.h1`

  display: flex;
  flex-direction: column;
  justify-content: center;

  font-family: "Anton", sans-serif;
  font-weight: 1000;
  font-style: normal;
  font-size: 13rem;

  line-height: 1;

  
  color: #E6C200;
  text-align: center;
  letter-spacing: -0.05em;

  margin: 0;
  text-shadow: 2px 2px 0 #888888;

  @media (max-width: 1150px) {
    font-size: 5.5rem;
  }

  @media (max-width: 768px) {
    font-size: 5rem;
  }

  .highlight {
    font-size: 9rem;
    color: #2E2E2E;
  }
`