import React, { Component } from 'react';
import styled from 'styled-components';
import Button from 'src/components/Button';

import werewolvesWin from 'src/assets/sounds/werewolves-win.mp3';
import villagersWin from 'src/assets/sounds/villagers-win.mp3';

const Wrapper = styled.div`
  text-align: center;
`;

const Win = styled.div`
  font-size: 4vh;
  margin-bottom: 2vh;
`;

const NewlyDeceased = styled.div`
  font-size: 3vh;
  margin-bottom: 2vh;
`;

const Players = styled.div`
  margin-bottom: 4vh;
`;

const PlayersHeader = styled.div`
  font-size: 3vh;
  margin-bottom: 1.5vh;
`;

const Player = styled.div`
  margin-bottom: 1.5vh;
`;

const refreshPage = () => {
  window.location.reload(false);
};

export default class DeceasedResults extends Component {
  componentDidMount() {
    if (this.props.winType === 'werewolves-win') {
      new Audio(werewolvesWin).play();
    } else {
      new Audio(villagersWin).play();
    }
  }

  render() {
    const {
      winType,
      newlyDeceased,
      deceased,
      villagers,
      werewolves
    } = this.props;

    let newlyDeceasedString;
    if (newlyDeceased && newlyDeceased.length) {
      newlyDeceasedString = newlyDeceased.join(', ');
    } else {
      newlyDeceasedString = 'Nobody';
    }
    return (
      <Wrapper id="roundOver">
        <Win id="win">
          {winType === 'werewolves-win'
            ? 'You could not kill the werewolves in time. Werewolves win!'
            : 'You survived and killed the werewolves. Villagers win!'}
        </Win>
        <NewlyDeceased id="newlyDeceased">
          {newlyDeceasedString}
          {newlyDeceased && newlyDeceased.length > 1 ? ' were ' : ' was '}
          {'killed by the town today'}
        </NewlyDeceased>
        <Players id="deceased">
          <PlayersHeader>All deceased:</PlayersHeader>
          {deceased.map(player => (
            <Player key={player} className="deceased">
              {player}
            </Player>
          ))}
        </Players>
        <Players id="villagers">
          <PlayersHeader>Villagers:</PlayersHeader>
          {villagers.map(player => (
            <Player key={player} className="villager">
              {player}
            </Player>
          ))}
        </Players>
        <Players id="werewolves">
          <PlayersHeader>Werewolves:</PlayersHeader>
          {werewolves.map(player => (
            <Player key={player} className="werewolf">
              {player}
            </Player>
          ))}
        </Players>
        <Button id="playAgain" onClick={refreshPage}>
          Play again
        </Button>
      </Wrapper>
    );
  }
}
