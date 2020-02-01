import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layout,
  FeatureHeader,
  InnerLayout,
  Card,
  ImageWrap,
  Image,
  TitleBlock,
  Title,
  Author
} from '../styles/podcastGrid';
import { API, Auth } from 'aws-amplify';

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

export default function PodcastGrid(props) {
  const [podcasts, setPodcasts] = useState([]);
  // const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function onLoad() {
      try {
        await Auth.currentCredentials();
        const podcasts = await loadPodcasts();
        setPodcasts(podcasts);
      } catch (e) {
        console.error(e);
      }
    }
    onLoad();
  }, []);

  function loadPodcasts() {
    return API.get('podcasts', '/podcasts');
  }

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
        <InstantSearch indexName="podcast-search" searchClient={searchClient}>
          <SearchBox onChange={e => setSearch(e.target.value)} />
          {search.length >= 1 ? <CustomHits /> : <div></div>}
        </InstantSearch>
        <FeatureHeader>Featured</FeatureHeader>
        <InnerLayout>
          {podcasts.map(podcast => (
            <Card key={podcast.podcastId}>
              <ImageWrap>
                <Link
                  key={podcast.podcastId}
                  to={`/podcasts/${podcast.podcastId}`}
                >
                  <Image src={podcast.image} alt={podcast.title} />
                </Link>
              </ImageWrap>
              <TitleBlock>
                <Title>{podcast.title}</Title>
                <Author>{podcast.author}</Author>
              </TitleBlock>
            </Card>
          ))}
        </InnerLayout>
      </Layout>
    </React.Fragment>
  );
}
