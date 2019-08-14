import React from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
import InputField from 'components/InputField';

const lowerCase = value => value && value.toLowerCase();

const Form = styled.form`
  width: 50vw;
  min-width: 200px;
`;

export default function PlayerConnectToGame(props) {
  return (
    <Form onSubmit={props.handleSubmit}>
      <InputField
        name="gameId"
        label="Game id"
        placeholder="Enter a 5-letter game id"
        autoComplete="off"
        maxLength="5"
        normalize={lowerCase}
      />
      <InputField
        name="name"
        label="Your name (max length 12)"
        placeholder="Enter your name"
        autoComplete="given-name"
      />
      <Button id="joinGame" type="submit" disabled={props.submitting}>
        {props.submitting ? 'Connecting...' : 'Join game'}
      </Button>
    </Form>
  );
}
