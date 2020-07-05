import { SET_LOGGED_USER, FETCH_POSTS, FETCH_USERS } from './types';

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

export function fetchPosts() {
  return function(dispatch) {
    db.collection('posts').onSnapshot( (snap) => {
      const newPosts = snap.docs.map( (doc) => (
        doc.data()
      ));
      dispatch({
        type: FETCH_POSTS,
        payload: newPosts
      })
    })
  }
}

export function fetchUsers() {
  return function(dispatch) {
    db.collection('users').onSnapshot( (snap) => {
      const newUsers = snap.docs.map( (doc) => (
        {
          doc.data(),
          doc.id
        }
      ));
      dispatch({
        type: FETCH_USERS,
        payload: newUsers
      })
    })
  }
}
