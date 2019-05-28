import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Pick from './Layout';
import validate from './validation';

const VillagerForm = reduxForm({
  form: 'villagerPick',
  onSubmit: (values, dispatch) => {
    dispatch({ type: 'PLAYER/SUBMIT_VILLAGER_PICK', values });
  },
  validate
})(Pick);

export function mapStateToProps({ player }) {
  return {
    id: 'villagerPick',
    pickOptions: player.villagers
  };
}

export default connect(mapStateToProps)(VillagerForm);
