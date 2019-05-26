import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Pick from './Layout';
import validate from './validation';

const WerewolfPickForm = reduxForm({
  form: 'werewolfPick',
  onSubmit: (values, dispatch) => {
    dispatch({ type: 'PLAYER/SUBMIT_WEREWOLF_PICK', values });
  },
  validate
})(Pick);

export function mapStateToProps({ player }) {
  return {
    pickOptions: player.villagers
  };
}

export default connect(mapStateToProps)(WerewolfPickForm);
