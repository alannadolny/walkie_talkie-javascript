import types from './types';
import mqtt from 'mqtt/dist/mqtt';

export const channelsReducer = (state = [], action) => {
  const client = mqtt.connect('mqtt://localhost:8000/mqtt');
  switch (action.type) {
    case types.GET_CHANNEL_LIST_SUCCESS:
      return action.payload;
    case types.GET_CHANNEL_LIST_FAILURE:
      return [];
    case types.POST_CHANNEL_SUCCESS:
      return [...state, action.payload];
    case types.CONNECT_CHANNEL_SUCCESS:
      client.publish(`channel/join`, JSON.stringify(action.payload));
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
      client.publish(`channel/leave`, JSON.stringify(action.payload));
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
      return [...state.filter((el) => el.name !== action.payload.name)];
    case types.JOIN_CHANNEL:
      return [
        ...state.map((el) => {
          if (el.name === action.payload.name)
            return {
              ...el,
              activeUsers: [...el.activeUsers, { login: action.payload.login }],
            };
          else return el;
        }),
      ];
    case types.LEAVE_CHANNEL:
      return [
        ...state.map((el) => {
          if (el.name === action.payload.name)
            return {
              ...el,
              activeUsers: [
                ...el.activeUsers.filter(
                  (el2) => el2.login !== action.payload.login
                ),
              ],
            };
          else return el;
        }),
      ];
    case types.CONNECT_TO_VOICE_CHANNEL_SUCCESS:
      return [
        ...state.map((el) => {
          if (el.name === action.payload.name) {
            return {
              ...el,
              currentIds: [...el.currentIds, action.payload.id],
            };
          } else {
            return el;
          }
        }),
      ];
    default:
      return state;
  }
};
