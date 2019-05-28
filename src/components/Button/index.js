import styled from 'styled-components';

export default styled.button`
  border: 0px solid transparent;
  padding: 1vh 1.8vh;
  font-size: 2.5vh;
  border-radius: 0.6vh;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  color: #fff;
  background-color: #199b94;

  ${props =>
    props.disabled
      ? 'opacity: 0.65;'
      : `:hover {
      background-color: #56DBC8;
    }
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;`};
`;
