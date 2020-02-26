import React, { useContext } from 'react';
import { Context } from '../context/store';
import styled from 'styled-components';
import whatsGood from '../images/main-image.jpg';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
// import { MdForward10 } from 'react-icons/md'

const BarHouse = styled.div`
  position: fixed;
  bottom: 0;
  background: #fff;
  min-width: 100%;
  max-height: 6em;
`;

const GridHouse = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  text-align: left;
  padding-right: 3em;
`;

const InfoHouse = styled.div`
  display: grid;
  grid-column-gap: 20px;
  grid-template-areas:
    'img title'
    'img bd';
  grid-template-columns: auto 3fr;
  grid-template-rows: auto auto;
  align-items: start;
  justify-items: start;
`;

const PlayCircle = styled(FaPlayCircle)`
  align-self: center;
  justify-self: end;
  color: purple;
  font-size: 4em;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

const PauseCircle = styled(FaPauseCircle)`
  align-self: center;
  justify-self: end;
  color: purple;
  font-size: 4em;
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

const Image = styled.img`
  grid-area: img;
  max-width: 6em;
`;

const Title = styled.h3`
  grid-area: title;
`;

const EpisodeDesc = styled.p`
  grid-area: bd;
`;

export default function PlayBar(props) {
  const { store, dispatch } = useContext(Context);
  return (
    <>
      {!store.play && (
        <React.Fragment>
          <BarHouse>
            <GridHouse>
              <InfoHouse>
                <Image src={whatsGood} />
                <Title>What's Good Games</Title>
                <EpisodeDesc>
                  Bring KOTOR Back You Cowards! - What's Good Games (Ep. 142)
                </EpisodeDesc>
              </InfoHouse>
              {console.log(store.isPlaying)}
              {!store.isPlaying ? (
                <PlayCircle
                  onClick={() => {
                    dispatch({ type: 'PLAY_URL' });
                  }}
                />
              ) : (
                <PauseCircle
                  onClick={() => {
                    dispatch({ type: 'PAUSE_URL' });
                  }}
                />
              )}
            </GridHouse>
          </BarHouse>
        </React.Fragment>
      )}
    </>
  );
}

// Take prop of audioUrl
// Play if audioUrl is true
