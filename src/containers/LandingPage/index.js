import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logo from 'src/assets/wolf.svg';
import ButtonComponent from 'src/components/Button';
import Centered from 'src/components/Centered';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 4vh;
`;

const Header = styled.div`
  padding: 3vh;
`;

const Logo = styled.img`
  height: 16vh;
`;

const Body = styled(Centered)`
  height: 20vh;
`;

const Button = styled(ButtonComponent)`
  margin: 0 2vh;
`;

const Footer = styled.div`
  margin: auto 5vw 1vh;
  font-size: 1.5vh;
`;

export default function LandingPage() {
  return (
    <Wrapper>
      <Header>
        <Logo src={logo} alt="Werewolf logo" />
        <Title>Werewolves</Title>
      </Header>
      <Body>
        <Link to="/host">
          <Button id="host">Start a game</Button>
        </Link>
        <Link to="/player">
          <Button id="player">Join a game</Button>
        </Link>
      </Body>
      {/* TODO instructions, link to https://www.wikihow.com/Play-Werewolf-(Party-Game) ? */}
      <Footer>
        {/* eslint-disable-next-line */}
        Icons made by{' '}
        <a
          href="https://www.flaticon.com/authors/roundicons"
          title="Roundicons"
        >
          Roundicons
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>{' '}
        are licensed by{' '}
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
        >
          CC 3.0 BY
        </a>
        .
      </Footer>
    </Wrapper>
  );
}
