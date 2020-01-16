import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/coreStyles';
import './App.css';
import { withRouter } from 'react-router-dom';

// Components
import Navigation from './components/Navigation';
import Routes from './Routes';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 15em 1fr;
  min-height: 100vh;
`;

function App() {
  return (
    <React.Fragment>
      <Layout>
        <Navigation />
        <Routes />
        <GlobalStyle />
      </Layout>
    </React.Fragment>
  );
}

export default withRouter(App);
