import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layout,
  Search,
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

export default function PodcastGrid(props) {
  const [podcasts, setPodcasts] = useState([]);
  // const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    async function onLoad() {
      try {
        await Auth.currentCredentials();
        const podcasts = await loadPodcasts();
        console.log(podcasts);
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

  return (
    <React.Fragment>
      <Layout>
        <Search placeholder="Search for podcasts here..." />
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
