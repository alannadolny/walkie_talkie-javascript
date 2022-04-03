import types from './types';

export const channelsReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_CHANNEL_LIST_SUCCESS:
      return action.payload;
    case types.GET_CHANNEL_LIST_FAILURE:
      return [];
    case types.POST_CHANNEL_SUCCESS:
      return [...state, action.payload];
    case types.CONNECT_CHANNEL_SUCCESS:
      return [
        ...state.map((el) => {
          if (el.name === action.payload.name) {
            return {
              ...el,
              activeUsers: [...el.activeUsers, { login: action.payload.login }],
            };
          } else {
            return el;
          }
        }),
      ];
    case types.DISCONNECT_CHANNEL_SUCCESS:
      return [
        ...state.map((el) => {
          if (el.name === action.payload.name) {
            return {
              ...el,
              activeUsers: [
                ...el.activeUsers.filter(
                  (el2) => el2.login !== action.payload.login
                ),
              ],
            };
          } else {
            return el;
          }
        }),
      ];
    case types.DELETE_CHANNEL_SUCCESS:
      return [...state.filter((el) => el.name != action.payload.name)];
    default:
      return state;
  }
};
