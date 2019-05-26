import { connect } from 'react-redux';

import { startingGame } from 'src/redux/Host';
import Layout from './Layout';

export function mapStateToProps({ host }) {
  return {
    gameId: host.gameId,
    players: host.players
  };
}

const actionCreators = {
  startingGame
};

export default connect(
  mapStateToProps,
  actionCreators
)(Layout);
