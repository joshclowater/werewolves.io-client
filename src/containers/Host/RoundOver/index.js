import { connect } from 'react-redux';

import Layout from './Layout';

export function mapStateToProps({ host }) {
  return {
    winType: host.winType,
    newlyDeceased: host.newlyDeceased,
    deceased: host.deceased,
    villagers: host.villagers,
    werewolves: host.werewolves
  };
}

export default connect(mapStateToProps)(Layout);
