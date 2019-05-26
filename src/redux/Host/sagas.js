import { delay, takeEvery, select } from 'redux-saga/effects';
import { socket } from 'src/socket';
import { startingGame } from './';

function onStartingGame() {
  socket.emit('START_GAME');
}

function onStartedGame() {
  // TODO instructions/countdown during this transition
  socket.emit('START_ROUND');
}

function* onHostStarted() {
  yield delay(10000);
  socket.emit('START_NIGHT');
}

function* onNightStarted() {
  yield delay(5000);
  socket.emit('START_WEREWOLVES_PICK');
}

function* onSubmittedWolfPick() {
  const werewolfPicks = yield select(state => state.host.werewolfPicks);
  const werewolves = yield select(state => state.host.werewolves);
  if (Object.values(werewolfPicks).length === werewolves.length) {
    socket.emit('END_WEREWOLVES_PICK');
  }
}

function* onWerewolvesPicksEnded() {
  yield delay(5000);
  socket.emit('START_DAY');
}

export default [
  takeEvery([startingGame], onStartingGame),
  takeEvery('HOST/STARTED_GAME', onStartedGame),
  takeEvery('HOST/ROUND_STARTED', onHostStarted),
  takeEvery('HOST/NIGHT_STARTED', onNightStarted),
  takeEvery('HOST/SUBMITTED_WEREWOLF_PICK', onSubmittedWolfPick),
  takeEvery('HOST/WEREWOLVES_PICKS_ENDED', onWerewolvesPicksEnded)
];
