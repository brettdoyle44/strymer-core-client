import styled from 'styled-components';

export const Layout = styled.main`
  grid-area: main;
  margin-top: 3em;
`;

export const LoadingLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FeatureHeader = styled.h1`
  font-weight: 900;
  color: #ef1860;
  text-align: left;
  padding: 0.5em 0px 0.75em 1em;
`;

export const InnerLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  grid-gap: 1.5em;
  margin: 1.5em 2.5em;
`;

export const FeatureLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1em;
  margin: 1.5em 2.5em;
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
  border-radius: 25px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

export const SpinnerLayout = styled.div`
  display: flex;
  min-height: 100%;
  align-items: center;
  justify-content: center;
`;
