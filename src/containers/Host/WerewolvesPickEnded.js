import React, { Component } from 'react';
import werewolvesCloseEyes from 'src/assets/sounds/werewolves-close-eyes.mp3';

export default class RoundStarted extends Component {
  componentDidMount() {
    new Audio(werewolvesCloseEyes).play();
  }

  render() {
    return (
      <div id="werewolvesPickEnded">
        Werewolves close your eyes. Night will continue in five seconds.
      </div>
    );
  }
}
