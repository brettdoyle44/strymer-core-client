import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { GlobalStyle } from './styles/coreStyles';
import './App.css';
import { Link, withRouter } from 'react-router-dom';
import { Button } from './styles/coreStyles';
import logo from './images/Strymer-Final-Logo.png';
import { Auth } from 'aws-amplify';

// Components
// import Navigation from './components/Navigation';
import Routes from './Routes';
import { TiHome, TiCog, TiHeart, TiCompass } from 'react-icons/ti';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 15em 1fr;
  min-height: 100vh;
`;

const Nav = styled.nav`
  display: flex;
  text-align: left;
  flex-direction: column;
  padding: 1em;
  background-color: #fff;
`;

const Logo = styled.div`
  max-width: 11em;
  padding: 1em 1em 1em 1.5em;
`;

const StrymerLogo = styled.img`
  max-width: 100%;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 1em 1em 1em;
  font-size: 1.15em;
`;
const AuthButtons = styled.div`
  display: flex;
  position: absolute;
  bottom: 10px;
  flex-direction: column;
  padding: 1em;
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

function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }
  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    props.history.push('/login');
  }
  return (
    !isAuthenticating && (
      <React.Fragment>
        <Layout>
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
                activestyle={active === 'home'}
              >
                <GenLink to="/" activestyle={active === 'home'}>
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
                activestyle={active === 'discover'}
              >
                <GenLink to="/discover" activestyle={active === 'discover'}>
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

            {isAuthenticated ? (
              <>
                <NavLinks>
                  <PodcastHeader>Profile</PodcastHeader>
                  <TheLink
                    onClick={() => {
                      setActive('favorites');
                    }}
                    activestyle={active === 'favorites'}
                  >
                    <GenLink
                      to="/favorites"
                      activestyle={active === 'favorites'}
                    >
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
                    activestyle={active === 'settings'}
                  >
                    <GenLink to="/" activestyle={active === 'settings'}>
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
                      setActive('');
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
                      setActive('');
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </AuthButtons>
            )}
          </Nav>
          <Routes
            appProps={{
              isAuthenticated,
              userHasAuthenticated,
              active,
              setActive
            }}
          />
          <GlobalStyle />
        </Layout>
      </React.Fragment>
    )
  );
}

export default withRouter(App);
