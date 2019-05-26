import { takeEvery } from 'redux-saga/effects';

function onDisconnect({ message }) {
  alert(message);
  window.location.reload();
}

export default [takeEvery('DISCONNECT', onDisconnect)];
