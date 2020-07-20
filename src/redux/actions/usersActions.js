import { FETCH_USERS_BEGINNING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  SET_LOGGED_USER_BEGIN,
  SET_LOGGED_USER_SUCCESS,
  SET_LOGGED_USER_FAIL
  } from './types';
import fire from '../../fire.js';
const db = fire.firestore();

export function setLoggerUser(user=null, id=null) {
  return function(dispatch) {
    dispatch(setLoggedUserBegin());
    if(id) {
      id.then( userId => {
        dispatch(setLoggedUserSuccess({ user, userId }))
      })
    } else {
        dispatch(setLoggedUserFailure({ user, id }))
    }

  }
}

export function fetchUsers() {
  return function(dispatch) {
    dispatch(fetchUsersBegin());
    db.collection('users').onSnapshot( (snap) => {
      const newUsers = snap.docs.map( (doc) => (
        {
          data: doc.data(),
          id: doc.id
        }
      ));

      if(newUsers) {
        dispatch(fetchUsersSuccess(newUsers));
      } else {
        dispatch(fetchUsersFailure('users not fetched'));
      }
    })
  }
}

export const fetchUsersBegin = () => ({
  type: FETCH_USERS_BEGINNING,
})

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: { users }
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: { error }
})

export const setLoggedUserBegin = () => ({
  type: SET_LOGGED_USER_BEGIN,
})

export const setLoggedUserSuccess = (user) => ({
  type: SET_LOGGED_USER_SUCCESS,
  payload: { user }
});

export const setLoggedUserFailure = (error) => ({
  type: SET_LOGGED_USER_FAIL,
  payload: { error }
})
