import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';

const Result = styled.div`
  text-align: center;
  font-size: 4vh;
  margin-bottom: 5vh;
`;

const refreshPage = () => {
  window.location.reload(false);
};

export default ({ win }) => (
  <div id="roundOver">
    <Result>{win ? 'You won!' : 'You lost'}</Result>
    <Button id="playAgain" onClick={refreshPage}>
      Play again
    </Button>
  </div>
);
