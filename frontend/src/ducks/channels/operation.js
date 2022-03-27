import types from './types';
import { createAction } from 'redux-api-middleware';

export const GetChannelList = () => {
  return createAction({
    endpoint: 'http://localhost:5000/channels',
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      types.GET_CHANNEL_LIST_REQUEST,
      {
        type: types.GET_CHANNEL_LIST_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.GET_CHANNEL_LIST_FAILURE,
    ],
  });
};
