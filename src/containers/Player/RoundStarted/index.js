import { connect } from 'react-redux';

import PlayerRole from 'src/components/PlayerRole';

export function mapStateToProps({ player }) {
  return {
    role: player.role
  };
}

export default connect(mapStateToProps)(PlayerRole);
