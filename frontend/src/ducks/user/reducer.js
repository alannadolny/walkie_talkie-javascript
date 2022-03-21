import types from './types';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return action.payload;
    case types.LOGIN_USER_FAILURE:
      return {};
    case types.REGISTER_USER_SUCCESS:
      return action.payload;
    case types.REGISTER_USER_FAILURE:
      return {};
    default:
      return state;
  }
};
