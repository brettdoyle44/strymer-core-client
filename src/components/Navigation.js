import React, { useContext } from 'react';
import { Context } from '../context/store';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import styled, { css } from 'styled-components';
import logo from '../images/Strymer-Final-Logo.png';
import { Button } from '../styles/coreStyles';
import { TiHome, TiCog, TiHeart, TiCompass } from 'react-icons/ti';

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
    props.activestyle &&
    css`
      background: #ef1860;
      border-radius: 25px;
      color: #fff;
      }
    `}
`;

const GenLink = styled(Link)`
  color: ${props => (props.activestyle ? '#fff' : '#01052d')};
  &:hover {
    text-decoration: none;
    color: ${props => (props.activestyle ? '#fff' : '#ef1860')};
  }
  &:focus {
    color: #fff;
    text-decoration: none;
  }
`;

const Navigation = props => {
  const { store, dispatch } = useContext(Context);

  async function handleLogout() {
    await Auth.signOut();
    dispatch({ type: 'USER_LOGOUT' });
    props.history.push('/login');
  }

  return (
    <Nav>
      <Logo>
        <StrymerLogo src={logo} alt="Strymer logo" />
      </Logo>
      <NavLinks>
        <PodcastHeader>Podcast</PodcastHeader>
        <TheLink
          onClick={() => {
            dispatch({ type: 'ACTIVE_NAV', payload: 'home' });
          }}
          activestyle={store.active === 'home'}
        >
          <GenLink to="/" activestyle={store.active === 'home'}>
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
            dispatch({ type: 'ACTIVE_NAV', payload: 'discover' });
          }}
          activestyle={store.active === 'discover'}
        >
          <GenLink to="/discover" activestyle={store.active === 'discover'}>
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
      </NavLinks>

      {store.hasAuthenticated ? (
        <>
          <NavLinks>
            <PodcastHeader>Profile</PodcastHeader>
            <TheLink
              onClick={() => {
                dispatch({ type: 'ACTIVE_NAV', payload: 'favorites' });
              }}
              activestyle={store.active === 'favorites'}
            >
              <GenLink to="/" activestyle={store.active === 'favorites'}>
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
                dispatch({ type: 'ACTIVE_NAV', payload: 'settings' });
              }}
              activestyle={store.active === 'settings'}
            >
              <GenLink to="/" activestyle={store.active === 'settings'}>
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
            <Button primary large onClick={handleLogout}>
              Log Out
            </Button>
          </AuthButtons>
        </>
      ) : (
        <AuthButtons>
          <Link to="/login">
            <Button
              primary
              large
              onClick={() => {
                dispatch({ type: 'ACTIVE_NAV', payload: '' });
              }}
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              primary
              large
              onClick={() => {
                dispatch({ type: 'ACTIVE_NAV', payload: '' });
              }}
            >
              Sign Up
            </Button>
          </Link>
        </AuthButtons>
      )}
    </Nav>
  );
};

export default Navigation;
