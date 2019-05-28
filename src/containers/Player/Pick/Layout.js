import React from 'react';
import styled from 'styled-components';

import Button from 'src/components/Button';
import RadioGroupField from 'src/components/RadioGroupField';

const Wrapper = styled.div`
  margin: 0 10vw;
  text-align: center;
  font-size: 3vh;
`;

const Instructions = styled.div`
  margin-bottom: 3vh;
`;

export default props => {
  return (
    <Wrapper id={props.id}>
      <Instructions>Pick who you choose to kill</Instructions>
      <form onSubmit={props.handleSubmit}>
        <RadioGroupField name="pick" options={props.pickOptions} />
        <Button id="submitPick" type="submit" disabled={props.submitting}>
          {props.submitting ? 'Submitting...' : 'Submit Pick'}
        </Button>
      </form>
    </Wrapper>
  );
};
