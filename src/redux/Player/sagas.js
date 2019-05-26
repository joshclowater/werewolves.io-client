import { put, select, takeEvery } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';
import { socket } from 'src/socket';

function* onSubmitConnectToGame({ values }) {
  yield put(startSubmit('playerConnectToGame'));
  socket.emit('CONNECT_TO_GAME', values);
}

function* onGameConnectionFailed({ error }) {
  yield put(stopSubmit('playerConnectToGame', error));
}

function* onSubmitWerewolfPick({ values }) {
  yield put(startSubmit('werewolfPick'));
  socket.emit('SUBMIT_WEREWOLF_PICK', values);
}

function* onWerewolfPickSubmitFailed({ error }) {
  yield put(stopSubmit('werewolfPick', error));
}

function* onSubmittedWerewolfPick({ playerName, pick }) {
  const myPlayerName = yield select(state => state.player.myPlayerName);
  if (playerName === myPlayerName) {
    yield put({ type: 'PLAYER/SUBMITTED_WEREWOLF_PICK_CURRENT_PLAYER' });
  } else {
    yield put({
      type: 'PLAYER/SUBMITTED_WEREWOLF_PICK_OTHER_PLAYER',
      playerName,
      pick
    });
  }
}

function* onSubmitVillagerPick({ values }) {
  yield put(startSubmit('villagerPick'));
  socket.emit('SUBMIT_VILLAGER_PICK', values);
}

function* onVillagerPickSubmitFailed({ error }) {
  yield put(stopSubmit('villagerPick', error));
}

export default [
  takeEvery('PLAYER/SUBMIT_CONNECT_TO_GAME', onSubmitConnectToGame),
  takeEvery('PLAYER/CONNECT_TO_GAME_FAILED', onGameConnectionFailed),
  takeEvery('PLAYER/SUBMIT_WEREWOLF_PICK', onSubmitWerewolfPick),
  takeEvery('PLAYER/SUBMIT_WEREWOLF_PICK_FAILED', onWerewolfPickSubmitFailed),
  takeEvery('PLAYER/SUBMITTED_WEREWOLF_PICK', onSubmittedWerewolfPick),
  takeEvery('PLAYER/SUBMIT_VILLAGER_PICK', onSubmitVillagerPick),
  takeEvery('PLAYER/SUBMIT_VILLAGER_PICK_FAILED', onVillagerPickSubmitFailed)
];
