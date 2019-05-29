import React, { Component } from 'react';
import styled from 'styled-components';
import { initSocket } from 'src/socket';

import CenteredComponent from 'src/components/Centered';
import LoadingMessage from 'src/components/LoadingMessage';
import Day from './Day';
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
      content =
        "The round has started. Look at your device to see your role. Don't let anyone else see your role.\n Night will begin in ten seconds.";
    } else if (this.props.status === 'night') {
      content = 'Everyone close their eyes. Night will begin in five seconds.';
    } else if (this.props.status === 'werewolves-picking') {
      content = 'Werewolves open your eyes. Decide who you are going to kill.';
    } else if (this.props.status === 'werewolves-picking-ended') {
      content = (
        <div id="werewolvesPickEnded">
          Werewolves close your eyes. Night will continue in five seconds.
        </div>
      );
    } else if (this.props.status === 'day') {
      content = <Day />;
    } else if (this.props.status === 'round-over') {
      content = <RoundOver />;
    } else {
      throw new Error('invalid status', this.props.status);
    }
    return <CenteredScreen>{content}</CenteredScreen>;
  }
}
