import styled from 'styled-components';

export const HitsLayout = styled.div`
  position: absolute;
  margin-top: 0.5em;
  margin-right: 1.5em;
  background-color: #fff;
  border-radius: 2em;
  display: grid;
  grid-gap: 1em;
  padding: 1em 0em;
  align-items: start;
  z-index: 999;
`;

export const HitsImage = styled.img`
  grid-area: img;
  max-width: 6em;
  border-radius: 15px;
  float: left;
  margin: 0 10px 0 0;
  width: 100%;
`;

export const HitsArea = styled.div`
  display: grid;
  grid-column-gap: 20px;
  padding: 1em 5em;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  align-items: start;
  justify-items: start;
  grid-template-areas:
    'img title'
    'img bd';
  &:hover {
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
`;

export const HitsHeader = styled.h4`
  grid-area: title;
  text-align: left;
  font-weight: 900;
`;

export const HitsTextBlock = styled.p`
  grid-area: bd;
  text-align: left;
`;
