import types from './types';
import { io } from 'socket.io-client';
import * as _ from 'lodash';

export const channelsReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_CHANNEL_LIST_SUCCESS:
      return action.payload;
    case types.GET_CHANNEL_LIST_FAILURE:
      return [];
    case types.POST_CHANNEL_SUCCESS:
      var socket = io(`http://${window.location.hostname}:5000`);
      socket.emit('newChannel', action.payload);
      socket.emit('end');
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
      var socket = io(`http://${window.location.hostname}:5000`);
      socket.emit('newDeleteChannel', action.payload);
      socket.emit('end');
      return [...state.filter((el) => el.name !== action.payload.name)];
    case types.JOIN_CHANNEL:
      console.log(action.payload);
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
    case types.CREATE_CHANNEL:
      return [...state, action.payload];
    case types.DELETE_CHANNEL:
      return [...state.filter((el) => el.name !== action.payload.name)];
    case types.DISCONNECT_FROM_VOICE_CHANNEL_SUCCESS:
      return [
        ...state.map((el) => {
          if (el.name === action.payload.name) {
            return {
              ...el,
              currentIds: [
                ...el.currentIds.filter((el2) => el2 !== action.payload.id),
              ],
            };
          } else {
            return el;
          }
        }),
      ];
    case types.DELETE_ID_FROM_STATE_ACTION:
      return [
        ...state.map((el) => {
          if (el.name === action.payload.name) {
            return {
              ...el,
              currentIds: [
                ...el.currentIds.filter((el2) => el2 !== action.payload.id),
              ],
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
