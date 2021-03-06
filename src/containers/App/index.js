import React, { Fragment, Suspense, lazy } from 'react';
import { HashRouter, Route } from 'react-router-dom';

import CenteredScreen from 'components/Centered/CenteredScreen';
import LoadingMessage from 'components/LoadingMessage';
import LandingPage from 'containers/LandingPage';

const Host = lazy(() => import('containers/Host'));
const Player = lazy(() => import('containers/Player'));

const fallback = (
  <CenteredScreen>
    <LoadingMessage message="Loading game" />
  </CenteredScreen>
);

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={fallback}>
        <Fragment>
          <Route exact path="/" component={LandingPage} />
          <Route path="/host" component={Host} />
          <Route path="/player" component={Player} />
        </Fragment>
      </Suspense>
    </HashRouter>
  );
}
