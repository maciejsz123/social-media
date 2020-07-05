import { SET_LOGGED_USER, FETCH_POSTS, FETCH_USERS } from '../actions/types';

const initialState = {
  loggedUser: {user: null, userId: null},
  posts: [],
  users: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_LOGGED_USER:
      return {
        ...state,
        loggedUser: action.payload
      }
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload
      }
    default:
      return state;
  }
}
