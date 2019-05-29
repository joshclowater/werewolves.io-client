import { connect } from 'react-redux';

import Layout from './Layout';

export function mapStateToProps({ player }) {
  return {
    win: player.win
  };
}

export default connect(mapStateToProps)(Layout);
