import React, { Component } from 'react';
import roundStarted from 'src/assets/sounds/round-started.mp3';

export default class RoundStarted extends Component {
  componentDidMount() {
    new Audio(roundStarted).play();
  }

  render() {
    return (
      <div id="roundStarted">
        {`The round has started. Look at your device to see your role. Don't let
        anyone else see your role. Night will begin in ten seconds.`}
      </div>
    );
  }
}
