import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify';
import { dev } from './config';

Amplify.configure({
  Auth: {
    region: dev.cognito.REGION,
    userPoolId: dev.cognito.USER_POOL_ID,
    identityPoolId: dev.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: dev.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: 'podcasts',
        endpoint: dev.apiGateway.URL,
        region: dev.apiGateway.REGION
      }
    ]
  }
});

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
