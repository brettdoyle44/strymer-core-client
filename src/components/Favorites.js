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
import { API } from 'aws-amplify';

export default function Favorites(props) {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    async function onLoad() {
      try {
        const podcasts = await loadFavorites();
        console.log(podcasts);
        setPodcasts(podcasts);
      } catch (e) {
        console.error(e);
      }
    }
    onLoad();
  }, []);

  function loadFavorites() {
    return API.get('favorites', '/favorites');
  }

  return (
    <React.Fragment>
      <Layout>
        <Search placeholder="Search for podcasts here..." />
        <FeatureHeader>Favorites</FeatureHeader>
        {podcasts.length !== 0 ? (
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
        ) : (
          <InnerLayout>
            <TitleBlock>
              <Title>You have not added any favorites yet.</Title>
            </TitleBlock>
          </InnerLayout>
        )}
      </Layout>
    </React.Fragment>
  );
}
