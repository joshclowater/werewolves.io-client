import { isEmpty } from 'src/utils/string';

export default values => {
  const errors = {};
  if (isEmpty(values.gameId)) {
    errors.gameId = 'Please enter a game id';
  } else if (values.gameId.length !== 5) {
    errors.gameId = 'Game id must be 5 characters';
  }
  if (isEmpty(values.name)) {
    errors.name = 'Please enter a name';
  } else if (values.name.length > 12) {
    errors.name = 'Name must be less than 12 characters';
  }
  return errors;
};
