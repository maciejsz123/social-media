import { SET_LOGGED_USER } from './types';

export function setLoggerUser(user) {
  return function(dispatch) {
    dispatch({
      type: SET_LOGGED_USER,
      payload: user
    })
  }
}
