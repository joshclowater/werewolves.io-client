import { connect } from 'react-redux';

import Layout from './Layout';

export function mapStateToProps({ host }) {
  return {
    win: host.winType,
    newlyDeceased: host.newlyDeceased,
    deceased: host.deceased,
    villagers: host.villagers,
    werewolves: host.werewolves
  };
}

export default connect(mapStateToProps)(Layout);
