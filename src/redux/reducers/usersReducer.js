import { SET_LOGGED_USER,
  FETCH_USERS_BEGINNING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  SET_LOGGED_USER_BEGIN,
  SET_LOGGED_USER_SUCCESS,
  SET_LOGGED_USER_FAIL,
  SET_ONLINE_USERS_COUNT
 } from '../actions/types';

const initialState = {
  loggedUser: {user: null, userId: null},
  loggedUserLoading: false,
  loggedUserError: null,
  users: [],
  loading: false,
  error: null,
  onlineUsers: 0
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_LOGGED_USER_BEGIN:
      return {
        ...state,
        loggedUserLoading: true,
        loggedUserError: false
      }
    case SET_LOGGED_USER_SUCCESS:
      return {
        ...state,
        loggedUser: {user: action.payload.user.user, userId: action.payload.user.userId},
        loggedUserLoading: false
      }
    case SET_LOGGED_USER_FAIL:
      return {
        ...state,
        loggedUser: {user: action.payload.error.user, userId: action.payload.error.id},
        loggedUserLoading: false,
        loggedUserError: true
      }
    case FETCH_USERS_BEGINNING:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        loading: false
      }
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        users: [],
        loading: false,
        error: action.payload.error
      }
    case SET_ONLINE_USERS_COUNT:
      return {
        ...state,
        onlineUsers: action.payload
      }
    default:
      return state;
  }
}
