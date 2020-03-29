import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/coreStyles';
import './App.css';
import { withRouter } from 'react-router-dom';
import Navigation from './components/NewNav';
import Header from './components/Header';
import Modal from 'react-modal';
import Login from './components/Login';
import Signup from './components/Signup';

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

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {
    backgroundColor: 'rgba(1, 5, 45, 0.5)',
    zIndex: '999'
  }
};

Modal.setAppElement('#root');

function App(props) {
  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      dispatch({ type: 'USER_HAS_AUTH' });
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

  function handleClose() {
    dispatch({ type: 'SHOW_MODAL', payload: false });
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
        <Modal
          isOpen={store.showModal}
          onRequestClose={handleClose}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {store.signIn ? <Login /> : <Signup />}
        </Modal>
      </Context.Provider>
    </React.Fragment>
  );
}

export default withRouter(App);
