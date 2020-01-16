import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';
import {
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
import moment from 'moment';
import { FaPlayCircle } from 'react-icons/fa';

export default function Podcast(props) {
  const [podcast, setPodcast] = useState({});

  useEffect(() => {
    function loadEvent() {
      return API.get('podcasts', `/podcasts/${props.match.params.id}`);
    }
    async function onLoad() {
      try {
        await Auth.currentCredentials();
        const podcast = await loadEvent();
        setPodcast(podcast);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  return (
    <div>
      {podcast.episodes && (
        <div>
          <Layout>
            <PodcastArea>
              <Image src={podcast.image} alt={podcast.title} />
              <Header>{podcast.title}</Header>
              <Author>{podcast.author}</Author>
              <TextBlock>{podcast.description}</TextBlock>
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
                <FaPlayCircle />
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
        </div>
      )}
    </div>
  );
}
