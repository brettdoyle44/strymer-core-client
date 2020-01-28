import styled from 'styled-components';

export const Layout = styled.div`
  padding: 2em;
`;

export const Search = styled.input`
  width: 100%;
  border-radius: 25px;
  border: 2px solid #d1d8e0;
  padding: 0.5em 1.5em;
  background-color: #fff;
  &:focus {
    outline: none;
    border: 2px solid #ef1860;
  }
`;

export const FeatureHeader = styled.h1`
  font-weight: 900;
  color: #ef1860;
  text-align: left;
  padding: 0.5em 0px 0.75em 0.25em;
`;

export const InnerLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 1em;
`;

export const Card = styled.div`
  position: relative;
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0.5rem 0 0.5rem 1rem;
`;

export const Title = styled.h4`
  text-align: left;
  font-weight: 900;
  margin-block-start: 0;
  margin-block-end: 0;
`;

export const Author = styled.p`
  margin-block-start: 0;
  margin-block-end: 0;
  text-align: left;
  color: #3e4e6c;
`;

export const ImageWrap = styled.div`
  line-height: 0;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 25px;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;
