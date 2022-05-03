import types from './types';

export const JoinChannelAction = (payload) => ({
  type: types.JOIN_CHANNEL,
  payload,
});

export const LeaveChannelAction = (payload) => ({
  type: types.LEAVE_CHANNEL,
  payload,
});

export const CreateChannelAction = (payload) => ({
  type: types.CREATE_CHANNEL,
  payload,
});

export const DeleteChannelAction = (payload) => ({
  type: types.DELETE_CHANNEL,
  payload,
});
