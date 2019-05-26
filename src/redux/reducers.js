import { combineReducers } from 'redux-starter-kit';
import { reducer as form } from 'redux-form';
import game from './Game';
import host from './Host';
import player from './Player';

export default combineReducers({
  form,
  game,
  host,
  player
});
