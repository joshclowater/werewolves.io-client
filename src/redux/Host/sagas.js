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
  yield delay(15000);
  socket.emit('START_NIGHT');
}

function* onNightStarted() {
  yield delay(10000);
  socket.emit('START_WEREWOLVES_PICK');
}

function* onSubmittedWolfPick() {
  const { werewolfPicks, werewolves } = yield select(state => state.host);
  if (Object.values(werewolfPicks).length === werewolves.length) {
    socket.emit('END_WEREWOLVES_PICK');
  }
}

function* onWerewolvesPicksEnded() {
  yield delay(10000);
  socket.emit('START_DAY');
}

function* onSubmittedVillagerPick() {
  const { villagerPicks, players, deceased } = yield select(
    state => state.host
  );
  if (
    Object.values(villagerPicks).length ===
    players.length - deceased.length
  ) {
    socket.emit('END_DAY');
  }
}

function* onDayEnded() {
  yield delay(8000);
  socket.emit('START_NIGHT');
}

export default [
  takeEvery([startingGame], onStartingGame),
  takeEvery('HOST/STARTED_GAME', onStartedGame),
  takeEvery('HOST/ROUND_STARTED', onHostStarted),
  takeEvery('HOST/NIGHT_STARTED', onNightStarted),
  takeEvery('HOST/SUBMITTED_WEREWOLF_PICK', onSubmittedWolfPick),
  takeEvery('HOST/WEREWOLVES_PICKS_ENDED', onWerewolvesPicksEnded),
  takeEvery('HOST/SUBMITTED_VILLAGER_PICK', onSubmittedVillagerPick),
  takeEvery('HOST/DAY_ENDED', onDayEnded)
];
