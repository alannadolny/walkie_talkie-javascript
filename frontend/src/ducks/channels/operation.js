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

export const CreateNewChannel = (name) => {
  return createAction({
    endpoint: 'http://localhost:5000/channels',
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
    types: [
      types.POST_CHANNEL_REQUEST,
      {
        type: types.POST_CHANNEL_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.POST_CHANNEL_FAILURE,
    ],
  });
};

export const JoinChannel = (name) => {
  return createAction({
    endpoint: 'http://localhost:5000/channels/connect',
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
    types: [
      types.CONNECT_CHANNEL_REQUEST,
      {
        type: types.CONNECT_CHANNEL_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.CONNECT_CHANNEL_FAILURE,
    ],
  });
};

export const LeftChannel = (name) => {
  return createAction({
    endpoint: 'http://localhost:5000/channels/disconnect',
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
    types: [
      types.DISCONNECT_CHANNEL_REQUEST,
      {
        type: types.DISCONNECT_CHANNEL_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.DISCONNECT_CHANNEL_FAILURE,
    ],
  });
};

export const DeleteChannel = (name) => {
  return createAction({
    endpoint: 'http://localhost:5000/channels/',
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
    types: [
      types.DELETE_CHANNEL_REQUEST,
      {
        type: types.DELETE_CHANNEL_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.DISCONNECT_CHANNEL_FAILURE,
    ],
  });
};

export const ConnectToVoiceChannel = (name, id) => {
  return createAction({
    endpoint: 'http://localhost:5000/channels/connect/voice',
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      id,
    }),
    types: [
      types.CONNECT_TO_VOICE_CHANNEL_REQUEST,
      {
        type: types.CONNECT_TO_VOICE_CHANNEL_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.CONNECT_TO_VOICE_CHANNEL_FAILURE,
    ],
  });
};

export const DisconnectFromVoiceChannel = (name, id) => {
  return createAction({
    endpoint: 'http://localhost:5000/channels/disconnect/voice',
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      id,
    }),
    types: [
      types.DISCONNECT_FROM_VOICE_CHANNEL_REQUEST,
      {
        type: types.DISCONNECT_FROM_VOICE_CHANNEL_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.DISCONNECT_FROM_VOICE_CHANNEL_FAILURE,
    ],
  });
};
