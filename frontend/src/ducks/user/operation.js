import types from './types';
import { createAction } from 'redux-api-middleware';

export const SignIn = (login, password) => {
  return createAction({
    endpoint: 'http://localhost:5000/user/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login,
      password,
    }),
    types: [
      types.GET_USER_REQUEST,
      {
        type: types.GET_USER_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return json;
        },
      },
      types.GET_USER_FAILURE,
    ],
  });
};
