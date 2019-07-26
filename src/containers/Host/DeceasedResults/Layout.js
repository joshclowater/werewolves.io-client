import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { playAsync as play } from 'src/utils/sound';
import everyoneOpenTheirEyes from 'src/assets/sounds/everyone-open-eyes.mp3';
import nobodyKilled from 'src/assets/sounds/nobody-killed.mp3';
import villageKilled from 'src/assets/sounds/village-killed.mp3';
import voteWerewolf from 'src/assets/sounds/vote-on-werewolf.mp3';
import werewolvesKilled from 'src/assets/sounds/werewolves-killed.mp3';

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

const Instructions = styled.div`
  font-size: 3vh;
  padding: 5vh 10vw 0;
`;

export default class DeceasedResults extends Component {
  componentDidMount = async () => {
    await play(everyoneOpenTheirEyes);
    if (this.props.newlyDeceased.length) {
      await play(werewolvesKilled);
    } else {
      await play(nobodyKilled);
    }
    await play(voteWerewolf);
  };

  componentDidUpdate = async prevProps => {
    if (prevProps.status === 'day' && this.props.status === 'day-ended') {
      if (this.props.newlyDeceased.length) {
        await play(villageKilled);
      } else {
        await play(nobodyKilled);
      }
    }
  };

  render() {
    const { status, newlyDeceased, deceased, living } = this.props;

    let killedBy;
    if (status === 'day') {
      killedBy = 'werewolves last night';
    } else if (status === 'day-ended') {
      killedBy = 'the village today';
    } else {
      throw new Error('Expected status of "day" or "day-ended". Got: ', status);
    }

    return (
      <Wrapper id="day">
        <NewlyDeceased id="newlyDeceased">
          {newlyDeceased.length ? (
            <Fragment>
              <PlayersHeader>Killed by {killedBy}:</PlayersHeader>
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
            <PlayersHeader>All deceased villagers:</PlayersHeader>
            {deceased.map(player => (
              <Player key={player}>{player}</Player>
            ))}
          </Players>
        )}
        <Players id="living">
          <PlayersHeader>All remaining living villagers:</PlayersHeader>
          {living.map(player => (
            <Player key={player}>{player}</Player>
          ))}
        </Players>
        {status === 'day' && (
          <Instructions>
            {`All remaining living members of the village can discuss who they think the werewolf is. 
            Vote on who you think is a werewolf.
            The member of the village with the most votes will be killed.`}
          </Instructions>
        )}
      </Wrapper>
    );
  }
}
