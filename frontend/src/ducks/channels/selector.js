export const getChannelsFromState = (state) => {
  return state.channels;
};

export const getChannelDetails = (state, id) => {
  console.log(state.channels);
  return state.channels.find((el) => el._id === id);
};
