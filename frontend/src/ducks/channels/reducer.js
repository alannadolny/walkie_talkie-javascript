import types from './types';

export const channelsReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_CHANNEL_LIST_SUCCESS:
      return action.payload;
    case types.GET_CHANNEL_LIST_FAILURE:
      return [];
    default:
      return state;
  }
};
