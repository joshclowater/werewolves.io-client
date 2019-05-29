import React from 'react';
import styled from 'styled-components';

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

export default function({
  win,
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
    <Wrapper id="win">
      <NewlyDeceased id="newlyDeceased">
        {newlyDeceasedString}
        {newlyDeceased && newlyDeceased.length > 1 ? ' were ' : ' was '}
        {'killed by the town last night'}
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
    </Wrapper>
  );
}
