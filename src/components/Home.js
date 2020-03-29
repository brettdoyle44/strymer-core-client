import React, { useEffect, useState, useContext } from 'react';
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
  SpinnerLayout,
  FeatureLayout
} from '../styles/podcastGrid';
import { API, Auth } from 'aws-amplify';
import { Context } from '../context/store';

import Spinner from 'react-spinkit';

export default function PodcastGrid(props) {
  const [featured, setFeatured] = useState([]);
  const [top, setTop] = useState([]);
  const { dispatch } = useContext(Context);
  // const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function onLoad() {
      dispatch({ type: 'ACTIVE_NAV', payload: 'home' });
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
  }, [dispatch]);

  function loadFeatured() {
    return API.get('podcasts', '/featured');
  }

  function loadTop() {
    return API.get('podcasts', '/top');
  }

  return (
    <React.Fragment>
      {!isLoading ? (
        <Layout>
          <SpinnerLayout>
            <Spinner
              name="pacman"
              style={{ fontSize: '15em', color: '#ef1860' }}
            />
          </SpinnerLayout>
        </Layout>
      ) : (
        <Layout>
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
