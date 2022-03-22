import types from './types';
import { createAction } from 'redux-api-middleware';

export const SignIn = (login, password) => {
  return createAction({
    endpoint: 'http://localhost:5000/users/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login,
      password,
    }),
    types: [
      types.LOGIN_USER_REQUEST,
      {
        type: types.LOGIN_USER_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return { login: json.login };
        },
      },
      types.LOGIN_USER_FAILURE,
    ],
  });
};

export const Register = (login, password) => {
  return createAction({
    endpoint: 'http://localhost:5000/users/register',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login,
      password,
    }),
    types: [
      types.REGISTER_USER_REQUEST,
      {
        type: types.REGISTER_USER_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          return { login: json.login };
        },
      },
      types.REGISTER_USER_FAILURE,
    ],
  });
};

export const GetUser = () => {
  return createAction({
    endpoint: 'http://localhost:5000/users/',
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
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
