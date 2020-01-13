import styled, { css, createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,700,900&display=swap');
  body {
    background-color: #ecf0f3;
    color: #242E42
    font-family: 'Roboto', sans-serif;
    text-align: center;
    font-weight: 400;
  }
`;

export const Button = styled.button`
  display: inline-block;
  border-radius: 50px;
  padding: 0.75rem 1rem;
  margin: 0.5rem 1rem;
  width: 10rem;
  font-weight: 400;
  border: none
  background: transparent;
  color: white;
  ${props =>
    props.primary &&
    css`
      background: #313e55;
      color: #fff;
    `}
    ${props =>
      props.pink &&
      css`
        background: #ec1966;
        color: #fff;
      `}
    ${props =>
      props.small &&
      css`
        width: 8rem;
      `}
      ${props =>
        props.medium &&
        css`
          width: 10rem;
        `}
        ${props =>
          props.large &&
          css`
            width: 12rem;
          `}
`;
