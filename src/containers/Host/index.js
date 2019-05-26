import { connect } from 'react-redux';

import Layout from './Layout';

export function mapStateToProps({ host }) {
  return {
    status: host.status
  };
}

export default connect(mapStateToProps)(Layout);
