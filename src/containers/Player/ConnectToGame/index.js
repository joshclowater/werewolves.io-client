import { reduxForm } from 'redux-form';
import PlayerConnectToGameComponent from './Layout';
import validate from './validation';

export default reduxForm({
  form: 'playerConnectToGame',
  onSubmit: (values, dispatch) => {
    dispatch({ type: 'PLAYER/SUBMIT_CONNECT_TO_GAME', values });
  },
  validate
})(PlayerConnectToGameComponent);
