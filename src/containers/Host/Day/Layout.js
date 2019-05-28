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

export default function({ newlyDeceased, deceased, living }) {
  return (
    <Wrapper id="day">
      <NewlyDeceased id="newlyDeceased">
        {newlyDeceased ? newlyDeceased : 'Nobody'}
        {` was killed by werewolves last night`}
      </NewlyDeceased>
      {deceased.length > 1 && (
        <Players id="deceased">
          <PlayersHeader>All deceased:</PlayersHeader>
          {deceased.map(player => (
            <Player key={player}>{player}</Player>
          ))}
        </Players>
      )}
      <Players id="living">
        <PlayersHeader>All remaining living:</PlayersHeader>
        {living.map(player => (
          <Player key={player}>{player}</Player>
        ))}
      </Players>
    </Wrapper>
  );
}
