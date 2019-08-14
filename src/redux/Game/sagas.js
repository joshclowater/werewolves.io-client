import { takeEvery } from 'redux-saga/effects';

function onHostDisconnect({ message }) {
  alert(message);
  window.location.reload();
}

export default [takeEvery('HOST_DISCONNECTED', onHostDisconnect)];
