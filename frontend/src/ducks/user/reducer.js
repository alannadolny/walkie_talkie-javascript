import types from './types';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
      return action.payload;
    case types.GET_USER_FAILURE:
      return {};
    default:
      return state;
  }
};
