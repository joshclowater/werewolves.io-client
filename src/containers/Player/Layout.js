import React, { Component } from 'react';
import styled from 'styled-components';
import { initSocket } from 'src/socket';

import CenteredComponent from 'src/components/Centered';
import LoadingMessage from 'src/components/LoadingMessage';
import PlayerRole from 'src/components/PlayerRole';
import ConnectToGame from './ConnectToGame';
import RoundOver from './RoundOver';
import RoundStarted from './RoundStarted';
import VillagerPick from './Pick/Villager';
import WerewolfPick from './Pick/Werewolf';

const CenteredScreen = styled(CenteredComponent)`
  height: 100vh;
`;

export default class Player extends Component {
  componentDidMount() {
    initSocket('player');
  }

  render() {
    let content;
    if (this.props.status === 'connecting-to-server') {
      content = <LoadingMessage message="Connecting to server" />;
    } else if (this.props.status === 'waiting-to-join') {
      content = <ConnectToGame />;
    } else if (this.props.status === 'waiting-for-game-start') {
      content = <div id="connected">Connected. Waiting for game to start.</div>;
    } else if (this.props.status === 'round-started') {
      content = <RoundStarted />;
    } else if (this.props.status === 'night') {
      content = (
        <div id="night">
          Close your eyes until you are told to open them again.
        </div>
      );
    } else if (this.props.status === 'werewolves-picking') {
      content = <WerewolfPick />;
    } else if (
      this.props.status === 'werewolf-pick-submitted' ||
      this.props.status === 'villager-pick-submitted'
    ) {
      content = <div id="submittedPick">Submitted pick</div>;
    } else if (this.props.status === 'deceased') {
      content = <PlayerRole role={this.props.status} />;
    } else if (this.props.status === 'day') {
      content = <VillagerPick />;
    } else if (this.props.status === 'day-ended') {
      content = <div id="dayEnded">The day has ended. Showing results.</div>;
    } else if (this.props.status === 'round-over') {
      content = <RoundOver />;
    } else {
      throw new Error('invalid status', this.props.status);
    }
    return <CenteredScreen>{content}</CenteredScreen>;
  }
}
