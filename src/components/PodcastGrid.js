import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import mainImage from '../images/main-image.jpg';
import { API, Auth } from 'aws-amplify';

const Layout = styled.div`
  grid-area: content;
`;

const InnerLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1em;
`;

const Card = styled.div`
  position: relative;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0.5rem 0 0.5rem 1rem;
`;

const Title = styled.h4`
  text-align: left;
  margin-block-start: 0;
  margin-block-end: 0;
`;

const Author = styled.p`
  margin-block-start: 0;
  margin-block-end: 0;
  color: #3e4e6c;
`;

const ImageWrap = styled.div`
  line-height: 0;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 25px;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

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
