import { connect } from 'react-redux';

import Layout from './Layout';

export function mapStateToProps({ player }) {
  return {
    status: player.status
  };
}

export default connect(mapStateToProps)(Layout);
