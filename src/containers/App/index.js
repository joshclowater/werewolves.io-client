import React, { Fragment, Suspense, lazy } from 'react';
import { HashRouter, Route } from 'react-router-dom';

import LoadingMessage from 'src/components/LoadingMessage';
import LandingPage from 'src/containers/LandingPage';

const Host = lazy(() => import('src/containers/Host'));
const Player = lazy(() => import('src/containers/Player'));

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<LoadingMessage message="Loading game" />}>
        <Fragment>
          <Route exact path="/" component={LandingPage} />
          <Route path="/host" component={Host} />
          <Route path="/player" component={Player} />
        </Fragment>
      </Suspense>
    </HashRouter>
  );
}
