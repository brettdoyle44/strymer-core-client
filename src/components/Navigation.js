import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import logo from '../images/Strymer-Final-Logo.png';
import { Button } from '../styles/coreStyles';
import {
  TiHome,
  TiCog,
  TiHeart,
  TiAdjustBrightness,
  TiCompass
} from 'react-icons/ti';

const Nav = styled.nav`
  display: flex;
  text-align: left;
  flex-direction: column;
  padding: 1em;
`;

const Logo = styled.div`
  max-width: 11em;
  padding: 1em;
`;

const StrymerLogo = styled.img`
  max-width: 100%;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 1em 1em 0.25em;
  font-size: 1.15em;
`;
const AuthButtons = styled.div`
  display: flex;
  position: absolute;
  bottom: 10px;
  flex-direction: column;
  padding: 1em 0;
`;

const PodcastHeader = styled.h4`
  font-weight: 900;
  color: #01052d;
  padding-left: 0.75em;
`;

const TheLink = styled.div`
  padding: 0.35em 0 0.35em 0.75em;
  ${props =>
    props.active &&
    css`
      background: #ef1860;
      border-radius: 25px;
      color: #fff;
      }
    `}
`;

const GenLink = styled(Link)`
  color: ${props => (props.active ? '#fff' : '#01052d')};
  &:hover {
    text-decoration: none;
    color: ${props => (props.active ? '#fff' : '#ef1860')};
  }
  &:focus {
    color: #fff;
    text-decoration: none;
  }
`;

const Navigation = () => {
  const [active, setActive] = useState('home');
  const [isAuthenticated, setAuthentication] = useState(null);
  return (
    <Nav>
      <Logo>
        <StrymerLogo src={logo} alt="Strymer logo" />
      </Logo>

      <NavLinks>
        <PodcastHeader>Podcast</PodcastHeader>
        <TheLink
          onClick={() => {
            setActive('home');
          }}
          active={active === 'home'}
        >
          <GenLink active={active === 'home'}>
            <TiHome
              style={{
                fontSize: '1.25em',
                position: 'relative',
                top: '3.5px'
              }}
            />{' '}
            Home
          </GenLink>
        </TheLink>
        <TheLink
          onClick={() => {
            setActive('discover');
          }}
          active={active === 'discover'}
        >
          <GenLink active={active === 'discover'}>
            <TiCompass
              style={{
                fontSize: '1.25em',
                position: 'relative',
                top: '3.5px'
              }}
            />{' '}
            Discover
          </GenLink>
        </TheLink>
        <TheLink
          onClick={() => {
            setActive('latest');
          }}
          active={active === 'latest'}
        >
          <GenLink active={active === 'latest'}>
            <TiAdjustBrightness
              style={{
                fontSize: '1.25em',
                position: 'relative',
                top: '3.5px'
              }}
            />{' '}
            Latest
          </GenLink>
        </TheLink>
      </NavLinks>

      {isAuthenticated ? (
        <>
          <NavLinks>
            <PodcastHeader>Profile</PodcastHeader>
            <TheLink
              onClick={() => {
                setActive('favorites');
              }}
              active={active === 'favorites'}
            >
              <GenLink active={active === 'favorites'}>
                <TiHeart
                  style={{
                    fontSize: '1.25em',
                    position: 'relative',
                    top: '3.5px'
                  }}
                />{' '}
                Favorites
              </GenLink>
            </TheLink>
            <TheLink
              onClick={() => {
                setActive('settings');
              }}
              active={active === 'settings'}
            >
              <GenLink active={active === 'settings'}>
                <TiCog
                  style={{
                    fontSize: '1.25em',
                    position: 'relative',
                    top: '3.5px'
                  }}
                />{' '}
                Settings
              </GenLink>
            </TheLink>
          </NavLinks>
          <AuthButtons>
            <Button primary large>
              Log Out
            </Button>
          </AuthButtons>
        </>
      ) : (
        <AuthButtons>
          <Button primary large>
            Login
          </Button>
          <Button primary large>
            Sign Up
          </Button>
        </AuthButtons>
      )}
    </Nav>
  );
};

export default Navigation;
