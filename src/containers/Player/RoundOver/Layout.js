import React from 'react';
import Button from 'src/components/Button';

const refreshPage = () => {
  window.location.reload(false);
}

export default ({ win }) => (
  <div id="roundOver">
    {win ? 'You won!' : 'You lost'}
    <Button id="playAgain" onClick={refreshPage}>Play again</Button>
  </div>
);