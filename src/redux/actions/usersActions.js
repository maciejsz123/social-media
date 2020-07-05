import { SET_LOGGED_USER } from './types';

export function setLoggerUser(user, id) {
  return function(dispatch) {
    if(id) {
      id.then( userId => {
        dispatch({
          type: SET_LOGGED_USER,
          payload: {user, userId}
        })
      })
    } else {
      dispatch({
        type: SET_LOGGED_USER,
        payload: {user, userId: id}
      })
    }
  }
}
