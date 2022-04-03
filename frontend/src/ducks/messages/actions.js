import types from './types';

export const AddNewMessage = (payload) => ({
  type: types.RECEIVE_MESSAGE,
  payload,
});
