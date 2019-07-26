import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'src/redux/store';
import App from 'src/containers/App';

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
  module.hot.accept('src/containers/App', () => {
    const NextApp = require('src/containers/App').default;
    render(NextApp);
  });
}
