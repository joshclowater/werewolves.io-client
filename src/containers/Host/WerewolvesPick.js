import React, { Component } from 'react';
import werewolvesOpenEyes from 'assets/sounds/werewolves-open-eyes.mp3';

export default class RoundStarted extends Component {
  componentDidMount() {
    new Audio(werewolvesOpenEyes).play();
  }

  render() {
    return (
      <div id="werewolvesPick">
        Werewolves open your eyes and decide who you are going to kill.
      </div>
    );
  }
}
