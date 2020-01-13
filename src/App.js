import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/coreStyles';
import './App.css';
import { withRouter } from 'react-router-dom';

// Components
import NavBar from './components/NavBar';
// import PodcastGrid from './components/PodcastGrid';
import Routes from './Routes';

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    'nav'
    'content';
  grid-template-rows: auto 1fr;
  grid-gap: 10px;
  height: 100vh;
`;

function App() {
  return (
    <React.Fragment>
      <Layout>
        <NavBar />
        <GlobalStyle />
        <Routes />
      </Layout>
    </React.Fragment>
  );
}

export default withRouter(App);
