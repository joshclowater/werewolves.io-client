import React, { Component } from 'react';
import night from 'src/assets/sounds/night.mp3';

export default class RoundStarted extends Component {
  componentDidMount() {
    new Audio(night).play();
  }

  render() {
    return (
      <div id="night">
        Everyone close their eyes. Night will begin in five seconds.
      </div>
    );
  }
}
