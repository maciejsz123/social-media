import { ADD_CHAT_TO_LIST,
  REMOVE_CHAT_FROM_LIST,
  FETCH_MESSAGE_BEGIN,
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGE_ERROR
} from './types';
import fire from '../../fire.js';
const db = fire.firestore();

export function addChat(user) {
  return function(dispatch) {

    dispatch({
      type: ADD_CHAT_TO_LIST,
      payload: user.id
    })
  }
}

export function closeWindow(user) {
  return function(dispatch) {
    console.log(user);
    dispatch({
      type: REMOVE_CHAT_FROM_LIST,
      payload: user
    })
  }
}

export function fetchMessages() {
  return function(dispatch) {
    dispatch(fetchMessagesBeggining());
    db.collection('messages').onSnapshot( (snap) => {
      const mapData = snap.docs.map( doc => doc.data());
      if(snap) {
        dispatch(fetchMessagesSuccess(mapData));
      } else {
        dispatch(fetchMessagesError('error'));
      }
    })
  }
}

const fetchMessagesBeggining = () => ({
  type: FETCH_MESSAGE_BEGIN
})

const fetchMessagesSuccess = (payload) => ({
  type: FETCH_MESSAGE_SUCCESS,
  payload
})

const fetchMessagesError = (payload) => ({
  type: FETCH_MESSAGE_ERROR,
  payload
})
