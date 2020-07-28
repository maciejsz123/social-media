import { ADD_CHAT_TO_LIST, REMOVE_CHAT_FROM_LIST } from './types';

export function addChat(user) {
  return function(dispatch) {

    dispatch({
      type: ADD_CHAT_TO_LIST,
      payload: user.id
    })
  }
}
