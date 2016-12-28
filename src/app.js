import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import Main from './components/main';

ReactDOM.render(
  <AppContainer>
    <Main />
  </AppContainer>,
  document.getElementById('app')
);

// See https://github.com/gaearon/react-hot-loader/tree/next-docs/docs
if (module.hot) {
  module.hot.accept('./components/main', () => {
    ReactDOM.render(
      <AppContainer>
        <Main />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
