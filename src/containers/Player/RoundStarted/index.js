import { connect } from 'react-redux';

import PlayerRole from 'components/PlayerRole';

export function mapStateToProps({ player }) {
  return {
    role: player.role
  };
}

export default connect(mapStateToProps)(PlayerRole);
