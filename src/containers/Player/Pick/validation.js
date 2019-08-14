import { isEmpty } from 'utils/string';

export default values => {
  const errors = {};
  if (isEmpty(values.pick)) {
    errors.pick = 'Please choose an option';
  }
  return errors;
};
