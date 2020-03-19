import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, connectHits } from 'react-instantsearch-dom';
import { search } from '../config';
import '../styles/searchOverwrite.css';

import {
  HitsLayout,
  HitsImage,
  HitsArea,
  HitsHeader,
  HitsTextBlock
} from '../styles/searchHits';

const searchClient = algoliasearch(search.APP_ID, search.SEARCH_ID);

const Layout = styled.header`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1em 0 4.75em;
  margin-top: 3em;
  @media (min-width: 46.875em) {
    padding: 0 1em 0 2.5em;
  }
`;

const SearchContainer = styled.div`
  flex-grow: 1;
`;

const MemberButtons = styled.div`
  padding-left: 2em;
`;

export default function PodcastGrid(props) {
  const [search, setSearch] = useState('');

  const Hits = ({ hits }) => (
    <HitsLayout>
      {hits.map(hit => (
        <Link
          key={hit.objectId}
          style={{ textDecoration: 'none', color: '#242E42' }}
          to={`/podcasts/${hit.podcastId}`}
        >
          <HitsArea>
            <HitsImage src={hit.image} alt={hit.title} />
            <HitsHeader>{hit.title}</HitsHeader>
            <HitsTextBlock>{hit.description}</HitsTextBlock>
          </HitsArea>
        </Link>
      ))}
    </HitsLayout>
  );

  const CustomHits = connectHits(Hits);

  return (
    <React.Fragment>
      <Layout>
        <SearchContainer>
          <InstantSearch
            indexName="dev_podcast-search"
            searchClient={searchClient}
          >
            <SearchBox onChange={e => setSearch(e.target.value)} />
            {search.length >= 1 ? <CustomHits /> : <div></div>}
          </InstantSearch>
        </SearchContainer>
        <MemberButtons>
          <button>Login</button>
          <button>Signup</button>
        </MemberButtons>
      </Layout>
    </React.Fragment>
  );
}
