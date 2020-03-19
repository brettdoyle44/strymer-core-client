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
  LoadingLayout
} from '../styles/podcastGrid';
import { API, Auth } from 'aws-amplify';
import Spinner from 'react-spinkit';

export default function PodcastGrid(props) {
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function onLoad() {
      try {
        await Auth.currentCredentials();
        const podcasts = await loadPodcasts();
        setPodcasts(podcasts);
        setLoading(true);
      } catch (e) {
        console.error(e);
      }
    }
    onLoad();
  }, []);

  function loadPodcasts() {
    return API.get('podcasts', '/podcasts');
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
          <FeatureHeader>Browse</FeatureHeader>
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
      )}
    </React.Fragment>
  );
}
