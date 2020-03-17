import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/coreStyles';
import './App.css';
import { withRouter } from 'react-router-dom';
import Navigation from './components/Navigation';

import { Auth } from 'aws-amplify';
import { initialState, reducer, Context } from './context/store';

// Components
// import Navigation from './components/Navigation';
import Routes from './Routes';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 15em 1fr;
  height: 100vh;
  grid-template-areas: 'nav main';
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
  return (
    <React.Fragment>
      <Context.Provider value={{ store, dispatch }}>
        <Layout>
          <Navigation style={{ gridArea: 'nav' }} />
          <Routes
            style={{ gridArea: 'main', overflowY: 'auto', overflowX: 'hidden' }}
          />
          <GlobalStyle />
        </Layout>
      </Context.Provider>
    </React.Fragment>
  );
}

export default withRouter(App);
