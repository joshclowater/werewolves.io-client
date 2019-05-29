import React from 'react';
import styled from 'styled-components';
import Button from 'src/components/Button';

const Wrapper = styled.div`
  text-align: center;
`;

const NewlyDeceased = styled.div`
  font-size: 4vh;
  margin-bottom: 4vh;
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

export default function({
  winType,
  newlyDeceased,
  deceased,
  villagers,
  werewolves
}) {
  let newlyDeceasedString;
  if (newlyDeceased && newlyDeceased.length) {
    newlyDeceasedString = newlyDeceased.join(', ');
  } else {
    newlyDeceasedString = 'Nobody';
  }
  return (
    <Wrapper id="roundOver">
      {winType === 'werewolves-win'
        ? 'You could not kill the werewolves in time. Werewolves win!'
        : 'You survived and killed the werewolves. Villagers win!'}
      <NewlyDeceased id="newlyDeceased">
        {newlyDeceasedString}
        {newlyDeceased && newlyDeceased.length > 1 ? ' were ' : ' was '}
        {'killed by the town today'}
      </NewlyDeceased>
      <Players id="deceased">
        <PlayersHeader>All deceased:</PlayersHeader>
        {deceased.map(player => (
          <Player key={player}>{player}</Player>
        ))}
      </Players>
      <Players id="villagers">
        <PlayersHeader>Villagers:</PlayersHeader>
        {villagers.map(player => (
          <Player key={player}>{player}</Player>
        ))}
      </Players>
      <Players id="werewolves">
        <PlayersHeader>Werewolves:</PlayersHeader>
        {werewolves.map(player => (
          <Player key={player}>{player}</Player>
        ))}
      </Players>
      <Button id="playAgain" onClick={refreshPage}>
        Play again
      </Button>
    </Wrapper>
  );
}
