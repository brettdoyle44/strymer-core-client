import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Podcast from './components/Podcast';
import Home from './components/Home.js';
import Login from './components/Login';
import Signup from './components/Signup';
import Favorites from './components/Favorites';
import Discover from './components/Discover';
import PlayBar from './components/PlayBar';
import App from './App';
import Layout from './components/LayoutTest';

import AppliedRoute from './routes/AppliedRoute';

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute
        exact
        path="/podcasts/:id"
        component={Podcast}
        appProps={appProps}
      />
      <AppliedRoute exact path="/" component={Home} appProps={appProps} />
      <AppliedRoute
        exact
        path="/discover"
        component={Discover}
        appProps={appProps}
      />
      <AppliedRoute
        path="/signup"
        exact
        component={Signup}
        appProps={appProps}
      />
      <AppliedRoute
        path="/favorites"
        exact
        component={Favorites}
        appProps={appProps}
      />
      <AppliedRoute
        path="/playbar"
        exact
        component={PlayBar}
        appProps={appProps}
      />
      <AppliedRoute exact path="/nav" component={App} appProps={appProps} />
      <AppliedRoute exact path="/login" component={Login} appProps={appProps} />
      <AppliedRoute
        exact
        path="/layout"
        component={Layout}
        appProps={appProps}
      />
      <Route component={App} />
    </Switch>
  );
}
