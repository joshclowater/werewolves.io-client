import { connect } from 'react-redux';

import Role from '../Role';

export function mapStateToProps({ player }) {
  return {
    role: player.role
  };
}

export default connect(mapStateToProps)(Role);
