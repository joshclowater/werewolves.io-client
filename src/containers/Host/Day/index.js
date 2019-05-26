import { connect } from 'react-redux';

import Layout from './Layout';

export function mapStateToProps({ host }) {
  return {
    newlyDeceased: host.newlyDeceased,
    deceased: host.deceased,
    living: Object.values(host.players)
      .map(player => player.name)
      .filter(player => !host.deceased.includes(player))
  };
}

export default connect(mapStateToProps)(Layout);
