import React, { Fragment } from 'react';
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

export default function({ status, newlyDeceased, deceased, living }) {
  let killedBy;
  if (status === 'day') {
    killedBy = 'werewolves last night';
  } else if (status === 'day-ended') {
    killedBy = 'the village today';
  } else {
    throw new Error('Expected status of "day" or "day-ended". Got:', status);
  }
  return (
    <Wrapper id="day">
      <NewlyDeceased id="newlyDeceased">
        {newlyDeceased.length ? (
          <Fragment>
            <PlayersHeader>Killed by {killedBy}</PlayersHeader>
            {newlyDeceased.map(player => (
              <Player key={player}>{player}</Player>
            ))}
          </Fragment>
        ) : (
          <PlayersHeader>Nobody was killed by {killedBy}</PlayersHeader>
        )}
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
