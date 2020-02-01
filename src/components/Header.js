import React from 'react';
import styled from 'styled-components';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits } from 'react-instantsearch-dom';
import { search } from '../config';

const searchClient = algoliasearch(search.APP_ID, search.SEARCH_ID);

const HeaderArea = styled.div`
  padding: 1em;
`;

// const SearchBar = styled.input`
//   width: 100%;
//   border-radius: 25px;
//   border: 1px solid #d1d8e0;
//   padding: 1em 1.5em;
//   background-color: #fff;
//   &:focus {
//     outline: none;
//     border: 1px solid #ef1860;
//   }
// `;

const Header = () => {
  return (
    <HeaderArea>
      <InstantSearch indexName="instant_search" searchClient={searchClient}>
        <Hits />
      </InstantSearch>
    </HeaderArea>
  );
};

export default Header;
