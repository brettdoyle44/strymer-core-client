import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Podcast from './components/Podcast';
import PodcastGrid from './components/PodcastGrid';

export default function Routes({ appProps }) {
  return (
    <Switch>
      <Route exact path="/podcasts/:id" component={Podcast} />
      <Route exact path="/" component={PodcastGrid} />
    </Switch>
  );
}
