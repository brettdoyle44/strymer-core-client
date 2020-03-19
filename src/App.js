import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/coreStyles';
import './App.css';
import { withRouter } from 'react-router-dom';
import Navigation from './components/NewNav';
import Header from './components/Header';

import { Auth } from 'aws-amplify';
import { initialState, reducer, Context } from './context/store';
import { FaBars } from 'react-icons/fa';

// Components
// import Navigation from './components/Navigation';
import Routes from './Routes';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr 50px;
  grid-template-areas:
    'header'
    'main';
  height: 100vh;

  @media (min-width: 46.875em) {
    grid-template-columns: 240px 1fr;
    grid-template-areas:
      'sidenav header'
      'sidenav main';
  }
`;

const MenuIcon = styled.div`
  position: fixed;
  display: flex;
  top: 1.25em;
  left: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
  padding: 12px;
  font-size: 1.5em;
`;

function App(props) {
  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      dispatch({ type: 'USER_HAS_AUTH' });
      dispatch({ type: 'ACTIVE_NAV', payload: 'home' });
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    dispatch({ type: 'USER_IS_AUTH' });
  }

  function handleClick() {
    if (store.activeNav === false) {
      dispatch({ type: 'SLIDE_NAV', payload: true });
    } else {
      dispatch({ type: 'SLIDE_NAV', payload: false });
    }
  }
  return (
    <React.Fragment>
      <Context.Provider value={{ store, dispatch }}>
        <Layout>
          <MenuIcon onClick={handleClick}>
            <FaBars onClick={handleClick} />
          </MenuIcon>
          <Header />
          <Navigation />
          <Routes />
          <GlobalStyle />
        </Layout>
      </Context.Provider>
    </React.Fragment>
  );
}

export default withRouter(App);
