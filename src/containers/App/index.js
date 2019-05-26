import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import LandingPage from 'src/containers/LandingPage';
import Host from 'src/containers/Host';
import Player from 'src/containers/Player';

export default function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Route exact path="/" component={LandingPage} />
        <Route path="/host" component={Host} />
        <Route path="/player" component={Player} />
      </Fragment>
    </BrowserRouter>
  );
}
