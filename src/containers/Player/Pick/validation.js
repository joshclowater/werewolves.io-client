import { isEmpty } from 'src/utils/string';

export default values => {
  const errors = {};
  if (isEmpty(values.pick)) {
    errors.pick = 'Please choose an option';
  }
  return errors;
};
