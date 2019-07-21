import React, { Component } from 'react';
import { initSocket } from 'src/socket';

import CenteredScreen from 'src/components/Centered/CenteredScreen';
import LoadingMessage from 'src/components/LoadingMessage';
import DeceasedResults from './DeceasedResults';
import Night from './Night';
import RoundOver from './RoundOver';
import RoundStarted from './RoundStarted';
import WaitingForPlayersToConnect from './WaitingForPlayersToConnect';
import WerewolvesPick from './WerewolvesPick';
import WerewolvesPickEnded from './WerewolvesPickEnded';

export default class Host extends Component {
  componentDidMount() {
    initSocket('host');
  }

  render() {
    const { status } = this.props;
    let content;
    if (status === 'connecting-to-server') {
      content = <LoadingMessage message="Connecting to server" />;
    } else if (status === 'waiting-for-players-to-connect') {
      content = <WaitingForPlayersToConnect />;
    } else if (status === 'starting-game') {
      content = <LoadingMessage id="startingGame" message="Starting game" />;
    } else if (status === 'round-started') {
      content = <RoundStarted />;
    } else if (status === 'night') {
      content = <Night />;
    } else if (status === 'werewolves-picking') {
      content = <WerewolvesPick />;
    } else if (status === 'werewolves-picking-ended') {
      content = <WerewolvesPickEnded />;
    } else if (status === 'day' || status === 'day-ended') {
      content = <DeceasedResults />;
    } else if (status === 'round-over') {
      content = <RoundOver />;
    } else {
      throw new Error('Invalid status for <Host />: ', status);
    }
    return <CenteredScreen>{content}</CenteredScreen>;
  }
}
