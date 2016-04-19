import { get, getStuff } from '../utils/api';
import 'react-redux';

export function requestGames() {
  return {
   type: 'GET_GAMES',
   //nah: 'naaaaah'
   nah: getStuff('/api/games')
  };
}

export function requestGame(game_id) {
  const data = get('/api/games/'+game_id);
  console.log('requestGame data: '+data);
  return data;
}

export function getGamePls(game_id) {
  return getStuff('/api/games/'+game_id);
  //return {
  //  type: 'GET_GAME',
  //  //nah: 'naaaaah'
  //  game_id: game_id,
  //  nah: result
  //};
}

export function requestKittens() {
  return dispatch => {
    dispatch({
      type: 'GET_GAME'
    });

    try {
      const result = get('/api/games/1');

      dispatch({
        type: 'GET_GAME_SUCCESS',
        data: result
      });
    } catch(e) {
      dispatch({
        type: 'GET_GAME_ERROR'
      });
    }
  }
}
