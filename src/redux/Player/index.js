import { createReducer } from 'redux-starter-kit';

// Initial state

const initialState = {
  status: 'connecting-to-server'
};

// Reducer

export default createReducer(initialState, {
  'PLAYER/CONNECTED': state => {
    state.status = 'waiting-to-join';
  },
  'PLAYER/CONNECTED_TO_GAME': (state, { name }) => {
    state.status = 'waiting-for-game-start';
    state.myPlayerName = name;
  },
  'PLAYER/ROUND_STARTED': (state, { role }) => {
    state.status = 'round-started';
    state.role = role;
  },
  'PLAYER/NIGHT_STARTED': state => {
    state.status = 'night';
  },
  'PLAYER/WEREWOLVES_PICKS_STARTED': (state, { villagers }) => {
    state.status = 'werewolves-picking';
    state.villagers = villagers;
  },
  'PLAYER/SUBMITTED_WEREWOLF_PICK_CURRENT_PLAYER': state => {
    state.status = 'werewolf-pick-submitted';
  },
  'PLAYER/WEREWOLVES_PICKS_ENDED': state => {
    state.status = 'night';
  },
  'PLAYER/DECEASED': state => {
    state.status = 'deceased';
  },
  'PLAYER/DAY_STARTED': (state, { villagers }) => {
    state.status = 'day';
    state.villagers = villagers;
  },
  'PLAYER/SUBMITTED_VILLAGER_PICK': state => {
    state.status = 'villager-pick-submitted';
  },
  'PLAYER/DAY_ENDED': state => {
    state.status = 'day-ended';
  },
  'PLAYER/ROUND_ENDED': (state, { win }) => {
    state.status = 'round-over';
    state.win =
      (state.role === 'werewolf' && win === 'werewolves-win') ||
      (state.role === 'villager' && win === 'villagers-win');
  }
});
