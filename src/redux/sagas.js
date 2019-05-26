import { all } from 'redux-saga/effects';
import gameSagas from './Game/sagas';
import hostSagas from './Host/sagas';
import playerSagas from './Player/sagas';

export default function* rootSaga() {
  yield all([...gameSagas]);
  yield all([...hostSagas]);
  yield all([...playerSagas]);
}
