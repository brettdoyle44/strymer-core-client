import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  grid-area: main;
  margin-top: 3em;
`;

export const Layout = styled.div`
  display: grid;
  grid-gap: 1em;
  padding: 1em;
  align-items: center;
  justify-items: center;
`;

export const Image = styled.img`
  grid-area: img;
  max-width: 10em;
  border-radius: 25px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  @media (min-width: 40em) {
    max-width: 20em;
    float: left;
    margin: 0 10px 0 0;
    width: 100%;
  }
`;

export const PodcastArea = styled.div`
  display: grid;
  grid-column-gap: 20px;
  padding: 1em;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: auto 3fr;
  grid-template-areas:
    'img title'
    'img author'
    'bd bd'
    'btn btn';
  @media (min-width: 40em) {
    grid-column-gap: 20px;
    padding: 1em 5em;
    grid-template-columns: 15em 3fr;
    grid-template-rows: auto auto 1fr;
    align-items: start;
    justify-items: start;
    grid-template-areas:
      'img title'
      'img author'
      'img bd'
      'img btn';
  }
`;

export const Header = styled.h2`
  grid-area: title;
  text-align: left;
  @media (min-width: 40em) {
    text-align: left;
  }
`;

export const Author = styled.h4`
  grid-area: author;
  text-align: left;
  @media (min-width: 40em) {
    text-align: left;
  }
`;

export const TextBlock = styled.p`
  grid-area: bd;
  text-align: left;
  padding: 1.5em 1em 0 0;
  @media (min-width: 40em) {
    text-align: left;
  }
`;

export const Episodes = styled.div`
  display: grid;
  text-align: left;
  grid-template-columns: 4fr 1fr;
  border-bottom: 1px solid #d1d8e0;
  @media (min-width: 40em) {
    margin: 0px 4em;
    padding: 0px 1em;
    grid-template-columns: 3fr 1fr;
    text-align: left;
    border-bottom: 1px solid #d1d8e0;
  }
`;

export const EpisodesSection = styled.div`
  display: grid;
  width: 100%;
  text-align: left;
  @media (min-width: 40em) {
    padding: 0 5em;
    grid-template-columns: 5fr;
    text-align: left;
  }
`;

export const EpText = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: 1em;
`;

export const EpTitle = styled.span`
  padding-bottom: 0.5em;
`;

export const EpContent = styled.span`
  padding-bottom: 0.5em;
`;

export const EpDate = styled.span`
  color: #ef1860;
`;

export const EpHeader = styled.h4`
  padding: 0px 1em;
  font-weight: 900;
`;

export const PlayWrap = styled.div`
  font-size: 3em;
  align-self: center;
  justify-self: center;
  &:hover {
    color: #ef1860;
    cursor: pointer;
  }
`;
