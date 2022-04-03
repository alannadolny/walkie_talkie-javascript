export const getChannelsFromState = (state) => {
  return state.channels;
};

export const getChannelDetails = (state, id) => {
  return state.channels.find((el) => el._id === id);
};
