import { SET_LOGGED_USER } from '../actions/types';

const initialState = {
  loggedUser: {user: null, userId: null}
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_LOGGED_USER:
      return {
        ...state,
        loggedUser: action.payload
      }
    default:
      return state;
  }
}
