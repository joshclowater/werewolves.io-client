import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'redux/store';
import App from 'containers/App';

import './index.css';

const render = Component => {
  return ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('containers/App', () => {
    const NextApp = require('containers/App').default;
    render(NextApp);
  });
}
