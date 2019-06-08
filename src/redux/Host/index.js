import { createAction, createReducer } from 'redux-starter-kit';

// Actions
// TODO XXX just use type/string
export const startingGame = createAction('HOST/STARTING_GAME');

// Initial state

const initialState = {
  status: 'connecting-to-server'
};

// Reducer

export default createReducer(initialState, {
  'HOST/CONNECTED': (state, action) => {
    state.gameId = action.gameId;
    state.status = 'waiting-for-players-to-connect';
    state.players = [];
  },
  'HOST/PLAYER_CONNECTED_TO_GAME': (state, { player }) => {
    state.players.push(player);
  },
  [startingGame]: state => {
    state.status = 'starting-game';
  },
  'HOST/ROUND_STARTED': (state, { villagers, werewolves }) => {
    state.status = 'round-started';
    state.villagers = villagers;
    state.werewolves = werewolves;
    state.deceased = [];
  },
  'HOST/NIGHT_STARTED': state => {
    state.status = 'night';
  },
  'HOST/WEREWOLVES_PICKS_STARTED': state => {
    state.status = 'werewolves-picking';
    state.werewolfPicks = {};
  },
  'HOST/SUBMITTED_WEREWOLF_PICK': (state, { playerName, pick }) => {
    state.werewolfPicks[playerName] = pick;
  },
  'HOST/WEREWOLVES_PICKS_ENDED': state => {
    state.status = 'werewolves-picking-ended';
  },
  'HOST/DAY_STARTED': (state, { newlyDeceased }) => {
    state.status = 'day';
    state.newlyDeceased = newlyDeceased;
    state.deceased = newlyDeceased.concat(state.deceased);
    state.villagerPicks = {};
  },
  'HOST/SUBMITTED_VILLAGER_PICK': (state, { playerName, pick }) => {
    state.villagerPicks[playerName] = pick;
  },
  'HOST/DAY_ENDED': (state, { newlyDeceased }) => {
    state.status = 'day-ended';
    state.newlyDeceased = newlyDeceased;
    state.deceased = newlyDeceased.concat(state.deceased);
  },
  'HOST/ROUND_ENDED': (state, { win, newlyDeceased }) => {
    state.status = 'round-over';
    state.winType = win;
    state.newlyDeceased = newlyDeceased;
    state.deceased.unshift(newlyDeceased);
  }
});
