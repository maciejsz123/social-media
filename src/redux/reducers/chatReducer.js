import { ADD_CHAT_TO_LIST, REMOVE_CHAT_FROM_LIST } from '../actions/types';

const initialState = {
  openedUsersTabs: [],
  messages: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_CHAT_TO_LIST:
      return {
        ...state,
        openedUsersTabs: [action.payload].reduce( (acc, item) => {
          if(!acc.includes(item)) {
            acc.push(item)
          }
          return acc
        }, [...state.openedUsersTabs])
      }
    case REMOVE_CHAT_FROM_LIST:
      return {
        ...state,
        openedUsersTabs: action.payload
      }
    default:
      return state
  }
}
