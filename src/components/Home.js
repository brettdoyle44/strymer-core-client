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
  Author,
  LoadingLayout,
  FeatureLayout
} from '../styles/podcastGrid';
import { API, Auth } from 'aws-amplify';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, connectHits } from 'react-instantsearch-dom';
import { search } from '../config';
import '../styles/searchOverwrite.css';
import Spinner from 'react-spinkit';

import {
  HitsLayout,
  HitsImage,
  HitsArea,
  HitsHeader,
  HitsTextBlock
} from '../styles/searchHits';

const searchClient = algoliasearch(search.APP_ID, search.SEARCH_ID);

export default function PodcastGrid(props) {
  const [featured, setFeatured] = useState([]);
  const [top, setTop] = useState([]);
  // const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function onLoad() {
      try {
        await Auth.currentCredentials();
        const featuredPodcasts = await loadFeatured();
        const topPodcasts = await loadTop();
        setFeatured(featuredPodcasts);
        setTop(topPodcasts);
        setLoading(true);
      } catch (e) {
        console.error(e);
      }
    }
    onLoad();
  }, []);

  function loadFeatured() {
    return API.get('podcasts', '/featured');
  }

  function loadTop() {
    return API.get('podcasts', '/top');
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
      {!isLoading ? (
        <>
          <LoadingLayout>
            <Spinner
              name="pacman"
              style={{ fontSize: '15em', color: '#ef1860' }}
            />
          </LoadingLayout>
        </>
      ) : (
        <Layout>
          <InstantSearch
            indexName="dev_podcast-search"
            searchClient={searchClient}
          >
            <SearchBox onChange={e => setSearch(e.target.value)} />
            {search.length >= 1 ? <CustomHits /> : <div></div>}
          </InstantSearch>
          <FeatureHeader>Featured</FeatureHeader>
          <FeatureLayout>
            {featured.map(podcast => (
              <Card key={podcast.podcastId}>
                <ImageWrap>
                  <Link
                    key={podcast.podcastId}
                    to={`/podcasts/${podcast.podcastId}`}
                  >
                    <Image src={podcast.image} alt={podcast.title} />
                  </Link>
                </ImageWrap>
              </Card>
            ))}
          </FeatureLayout>
          <FeatureHeader>Popular</FeatureHeader>
          <InnerLayout>
            {top.map(podcast => (
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
      )}
    </React.Fragment>
  );
}
