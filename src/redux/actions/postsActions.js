import { FETCH_POSTS_BEGIN, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE } from './types';
import fire from '../../fire.js';
const db = fire.firestore();

export function fetchPosts() {
  return function(dispatch) {
    dispatch(fetchPostsBegin());
    db.collection('posts').onSnapshot( (snap) => {
      let newPosts = snap.docs.map( doc => (
        doc.data()
      )).sort((a,b) => a.date.seconds < b.date.seconds);

      if(snap) {
        dispatch(fetchPostsSuccess(newPosts))
      } else {
        dispatch(fetchPostsFailure('posts not fetched'))
      }
    })
  }
}

export const fetchPostsBegin = () => ({
  type: FETCH_POSTS_BEGIN
});

export const fetchPostsSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  payload: { posts }
});

export const fetchPostsFailure = error => ({
  type: FETCH_POSTS_FAILURE,
  payload: { error }
})
