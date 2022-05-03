import types from './types';

export const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_MESSAGES_SUCCESS:
      return action.payload;
    case types.GET_MESSAGES_FAILURE:
      return [];
    case types.SEND_MESSAGE_SUCCESS:
      return [...state, action.payload];
    case types.RECEIVE_MESSAGE:
      return [...state, action.payload];
    default:
      return state;
  }
};
