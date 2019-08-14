import React, { Component } from 'react';
import { initSocket } from 'socket';

import CenteredScreen from 'components/Centered/CenteredScreen';
import LoadingMessage from 'components/LoadingMessage';
import PlayerRole from 'components/PlayerRole';
import ConnectToGame from './ConnectToGame';
import RoundOver from './RoundOver';
import RoundStarted from './RoundStarted';
import VillagerPick from './Pick/Villager';
import WerewolfPick from './Pick/Werewolf';

export default class Player extends Component {
  componentDidMount() {
    initSocket('player');
  }

  render() {
    const { status } = this.props;
    let content;
    if (status === 'connecting-to-server') {
      content = <LoadingMessage message="Connecting to server" />;
    } else if (status === 'waiting-to-join') {
      content = <ConnectToGame />;
    } else if (status === 'waiting-for-game-start') {
      content = <div id="connected">Connected. Waiting for game to start.</div>;
    } else if (status === 'round-started') {
      content = <RoundStarted />;
    } else if (status === 'night') {
      content = (
        <div id="night">
          Close your eyes until you are told to open them again.
        </div>
      );
    } else if (status === 'werewolves-picking') {
      content = <WerewolfPick />;
    } else if (
      status === 'werewolf-pick-submitted' ||
      status === 'villager-pick-submitted'
    ) {
      content = <div id="submittedPick">Submitted pick</div>;
    } else if (status === 'deceased') {
      content = <PlayerRole role={status} />;
    } else if (status === 'day') {
      content = <VillagerPick />;
    } else if (status === 'day-ended') {
      content = <div id="dayEnded">The day has ended. Showing results.</div>;
    } else if (status === 'round-over') {
      content = <RoundOver />;
    } else {
      throw new Error('invalid status', status);
    }
    return <CenteredScreen>{content}</CenteredScreen>;
  }
}
