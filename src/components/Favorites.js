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
import { API } from 'aws-amplify';
import Spinner from 'react-spinkit';
import { TiHeart } from 'react-icons/ti';

export default function Favorites(props) {
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function onLoad() {
      try {
        const podcasts = await loadFavorites();
        setPodcasts(podcasts);
        setLoading(true);
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
      {!isLoading ? (
        <>
          <LoadingLayout>
            <Spinner name="three-bounce" style={{ color: '#ef1860;' }} />
          </LoadingLayout>
        </>
      ) : (
        <Layout>
          {podcasts.length !== 0 ? (
            <>
              <FeatureHeader>Favorites</FeatureHeader>
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
            </>
          ) : (
            <>
              <LoadingLayout>
                <h2 style={{ fontWeight: '900', marginTop: '5em' }}>
                  <TiHeart /> You have not added any favorites yet.
                </h2>
              </LoadingLayout>
            </>
          )}
        </Layout>
      )}
    </React.Fragment>
  );
}
