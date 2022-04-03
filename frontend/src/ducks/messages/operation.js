import types from './types';
import { createAction } from 'redux-api-middleware';

export const GetMessages = (name) => {
  return createAction({
    endpoint: `http://localhost:5000/messages/channel/${name}`,
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      types.GET_MESSAGES_REQUEST,
      {
        type: types.GET_MESSAGES_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.GET_MESSAGES_FAILURE,
    ],
  });
};

export const SendMessage = (name, text) => {
  return createAction({
    endpoint: `http://localhost:5000/messages/`,
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      text,
    }),
    types: [
      types.SEND_MESSAGE_REQUEST,
      {
        type: types.SEND_MESSAGE_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.SEND_MESSAGE_FAILURE,
    ],
  });
};
