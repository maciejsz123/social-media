import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import postsReducer from './postsReducer';
import chatReducer from './chatReducer';

export default combineReducers({
  users: usersReducer,
  posts: postsReducer,
  chat: chatReducer
})
