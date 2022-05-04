import types from './types';

export const userReducer = (state = { user: {}, error: false }, action) => {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return { user: action.payload, error: false };
    case types.LOGIN_USER_FAILURE:
      return { user: {}, error: true };
    case types.REGISTER_USER_SUCCESS:
      return { user: action.payload, error: false };
    case types.REGISTER_USER_FAILURE:
      return { user: {}, error: true };
    case types.GET_USER_SUCCESS:
      return { user: action.payload, error: false };
    case types.GET_USER_FAILURE:
      return { user: {}, error: true };
    case types.USER_LOGOUT_SUCCESS:
      return { user: {}, error: false };
    default:
      return state;
  }
};
