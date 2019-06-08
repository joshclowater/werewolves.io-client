import React, { Component } from 'react';
import styled from 'styled-components';
import { initSocket } from 'src/socket';

import CenteredComponent from 'src/components/Centered';
import LoadingMessage from 'src/components/LoadingMessage';
import DeceasedResults from './DeceasedResults';
import RoundOver from './RoundOver';
import WaitingForPlayersToConnect from './WaitingForPlayersToConnect';

const CenteredScreen = styled(CenteredComponent)`
  height: 100vh;
`;

export default class Host extends Component {
  componentDidMount() {
    initSocket('host');
  }

  render() {
    let content;
    if (this.props.status === 'connecting-to-server') {
      content = <LoadingMessage message="Connecting to server" />;
    } else if (this.props.status === 'waiting-for-players-to-connect') {
      content = <WaitingForPlayersToConnect />;
    } else if (this.props.status === 'starting-game') {
      content = <LoadingMessage id="startingGame" message="Starting game" />;
    } else if (this.props.status === 'round-started') {
      content = (
        <div id="roundStarted">
          The round has started. Look at your device to see your role. Don't let
          &nnbsp;anyone else see your role.\n Night will begin in ten seconds.
        </div>
      );
    } else if (this.props.status === 'night') {
      content = (
        <div id="night">
          Everyone close their eyes. Night will begin in five seconds.
        </div>
      );
    } else if (this.props.status === 'werewolves-picking') {
      content = (
        <div id="werewolvesPick">
          Werewolves open your eyes. Decide who you are going to kill.
        </div>
      );
    } else if (this.props.status === 'werewolves-picking-ended') {
      content = (
        <div id="werewolvesPickEnded">
          Werewolves close your eyes. Night will continue in five seconds.
        </div>
      );
    } else if (
      this.props.status === 'day' ||
      this.props.status === 'day-ended'
    ) {
      content = <DeceasedResults />;
    } else if (this.props.status === 'round-over') {
      content = <RoundOver />;
    } else {
      throw new Error('invalid status', this.props.status);
    }
    return <CenteredScreen>{content}</CenteredScreen>;
  }
}
