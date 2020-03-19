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
import { DateUtils } from '@aws-amplify/core';

import Spinner from 'react-spinkit';

export default function PodcastGrid(props) {
  const [featured, setFeatured] = useState([]);
  const [top, setTop] = useState([]);
  // const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function onLoad() {
      try {
        const cred = await Auth.currentCredentials();
        DateUtils.setClockOffset(
          cred['cognito']['config']['systemClockOffset']
        );
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
