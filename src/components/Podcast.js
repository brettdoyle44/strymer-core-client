import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../context/store';
import { API, Auth } from 'aws-amplify';
import {
  LayoutWrapper,
  Layout,
  PodcastArea,
  Image,
  Header,
  Author,
  TextBlock,
  Episodes,
  EpisodesSection,
  EpText,
  EpContent,
  EpDate,
  EpHeader,
  EpTitle,
  PlayWrap
} from '../styles/podcast';
import { Button } from '../styles/coreStyles';
import moment from 'moment';
import { FaPlayCircle } from 'react-icons/fa';

export default function Podcast(props) {
  const [podcast, setPodcast] = useState({});
  const [podcastId, setPodcastId] = useState('');
  const { store, dispatch } = useContext(Context);

  useEffect(() => {
    function loadEvent() {
      return API.get('podcasts', `/podcasts/${props.match.params.id}`);
    }
    async function onLoad() {
      try {
        await Auth.currentCredentials();
        const podcast = await loadEvent();
        setPodcastId(props.match.params.id);
        setPodcast(podcast);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await addFavorite({ podcastId });
      // props.history.push('/');
    } catch (e) {
      alert(e);
    }
  }

  function addFavorite(event) {
    return API.post('favorites', '/favorites', {
      body: event
    });
  }

  return (
    <>
      {podcast.episodes && (
        <LayoutWrapper>
          <Layout>
            <PodcastArea>
              <Image src={podcast.image} alt={podcast.title} />
              <Header>{podcast.title}</Header>
              <Author>{podcast.author}</Author>
              <TextBlock>{podcast.description}</TextBlock>
              {store.hasAuthenticated && (
                <Button
                  style={{ gridArea: 'btn', minWidth: '200px' }}
                  onClick={handleSubmit}
                  primary
                >
                  Add to Favorites
                </Button>
              )}
            </PodcastArea>
            <EpisodesSection>
              <EpHeader>Episodes</EpHeader>
            </EpisodesSection>
            <Episodes>
              <EpText>
                <EpTitle>
                  <strong>{podcast.episodes[0].title}</strong>
                </EpTitle>
                <EpContent>
                  {podcast.episodes[0].description.substring(0, 200) + '...'}
                </EpContent>
                <EpDate>
                  {moment(podcast.episodes[0].pubDate).format('MMMM Do YYYY')}
                </EpDate>
              </EpText>
              <PlayWrap>
                <FaPlayCircle
                  onClick={() => {
                    dispatch({
                      type: 'AUDIO_URL',
                      payload: podcast.episodes[0].audioUrl
                    });
                    console.log(store.audioUrl);
                  }}
                />
              </PlayWrap>
            </Episodes>
            <Episodes>
              <EpText>
                <EpTitle>
                  <strong>{podcast.episodes[2].title}</strong>
                </EpTitle>
                <EpContent>
                  {podcast.episodes[2].description.substring(0, 200) + '...'}
                </EpContent>
                <EpDate>
                  {moment(podcast.episodes[2].pubDate).format('MMMM Do YYYY')}
                </EpDate>
              </EpText>
              <PlayWrap>
                <FaPlayCircle />
              </PlayWrap>
            </Episodes>
          </Layout>
        </LayoutWrapper>
      )}
    </>
  );
}
