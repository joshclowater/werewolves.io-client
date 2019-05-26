import React from 'react';
import styled from 'styled-components';
import angel from 'src/assets/angel.svg';
import villager from 'src/assets/villager.svg';
import werewolf from 'src/assets/wolf.svg';

const Wrapper = styled.div`
  text-align: center;
`;

const Avatar = styled.img`
  height: 40vh;
`;

const Description = styled.div`
  margin 4vh 5vw;
`;

export default function({ role }) {
  let avatar;
  let alt;
  let description;
  if (role === 'villager') {
    avatar = villager;
    alt = 'Villager';
    description =
      "You are a villager. Don't let anyone know your identity. You will win by killing the werewolves during the day before they kill you at night.";
  } else if (role === 'werewolf') {
    avatar = werewolf;
    alt = 'Werewolf';
    description =
      'You are a werewolf. You will win by killing the villagers before they kill you during the day.';
  } else if (role === 'deceased') {
    avatar = angel;
    alt = 'Deceased';
    description =
      'You are a deceased. You cannot speak anymore. You can keep your eyes open during the night.';
  } else {
    throw new Error('Unhandled role: ', role);
  }
  return (
    <Wrapper>
      <Avatar src={avatar} alt={alt} />
      <Description>{description}</Description>
    </Wrapper>
  );
}
