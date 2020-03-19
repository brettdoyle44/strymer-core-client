import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Context } from '../context/store';
import { TiHome, TiCompass, TiCog, TiHeart } from 'react-icons/ti';
import logo from '../images/Strymer-Final-Logo.png';

const SideNav = styled.aside`
  grid-area: sidenav;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 240px;
  position: fixed;
  overflow-y: auto;
  z-index: 2;
  text-align: left;
  background-color: #ecf0f3;
  transition: all 0.6s ease-in-out;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  ${props =>
    props.active
      ? css`
          transform: 'translateX(0)';
        `
      : css`
          transform: translateX(-245px);
        `}

  @media (min-width: 46.875em) {
    position: fixed;
    transform: translateX(0);
    box-shadow: none;
    background-color: #fff;
  }
`;

const Logo = styled.div`
  max-width: 12em;
  padding: 1em;
  margin-top: 1.2em;
  margin-left: 2.5em;
`;

const StrymerLogo = styled.img`
  max-width: 100%;
`;

const SideNavClose = styled.div`
  position: absolute;
  visibility: visible;
  top: 8px;
  right: 12px;
  cursor: pointer;
  font-size: 20px;
  color: #ddd;

  @media (min-width: 46.875em) {
    visibility: hidden;
  }
`;

const NavLinkContainer = styled.div`
  margin-top: 40px;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 1em 1em 2.5em;
  font-size: 1.15em;
`;

const PodcastHeader = styled.h4`
  font-weight: 700;
  color: #ef1860;
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

export default function LayoutTest() {
  const { store, dispatch } = useContext(Context);

  function handleClick() {
    if (store.activeNav === false) {
      dispatch({ type: 'SLIDE_NAV', payload: true });
    } else {
      dispatch({ type: 'SLIDE_NAV', payload: false });
    }
  }

  return (
    <>
      <SideNav active={store.activeNav}>
        <SideNavClose onClick={handleClick}>
          <FaTimes onClick={handleClick} />
        </SideNavClose>
        <Logo>
          <StrymerLogo src={logo} alt="Strymer logo" />
        </Logo>
        <NavLinkContainer>
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
          <NavLinks>
            <PodcastHeader>Profile</PodcastHeader>
            <TheLink
              onClick={() => {
                dispatch({ type: 'ACTIVE_NAV', payload: 'favorites' });
              }}
              activestyle={store.active === 'favorites'}
            >
              <GenLink
                to="/favorites"
                activestyle={store.active === 'favorites'}
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
        </NavLinkContainer>
      </SideNav>
    </>
  );
}
