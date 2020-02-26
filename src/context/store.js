import React from 'react';

const initialState = {
  audioUrl: null,
  isPlaying: false,
  isAuthenticating: true,
  hasAuthenticated: false,
  active: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'PLAY_URL':
      return { isPlaying: true };
    case 'SET_AUDIO_URL':
      return { audioUrl: action.payload };
    case 'AUDIO_URL':
      return { audioUrl: action.payload };
    case 'PAUSE_URL':
      return initialState.isPlaying;
    case 'USER_HAS_AUTH':
      return { hasAuthenticated: true };
    case 'USER_IS_AUTH':
      return { isAuthenticating: false };
    case 'USER_LOGOUT':
      return { hasAuthenticated: false };
    case 'ACTIVE_NAV':
      return { active: action.payload };
    default:
      throw new Error();
  }
};

const Context = React.createContext();

export { initialState, reducer, Context };
