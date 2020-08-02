import { ADD_CHAT_TO_LIST,
  REMOVE_CHAT_FROM_LIST,
  FETCH_MESSAGE_BEGIN,
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGE_ERROR
} from '../actions/types';

const initialState = {
  openedUsersTabs: [],
  messages: [],
  loading: false,
  error: null
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
        openedUsersTabs: state.openedUsersTabs.reduce( (acc, item) => {
          if(!(item === action.payload)) {
            acc.push(item);
          }
          return acc;
        }, [])
      }
    case FETCH_MESSAGE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: action.payload,
        loading: false
      }
    case FETCH_MESSAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        messages: []
      }
    default:
      return state
  }
}
