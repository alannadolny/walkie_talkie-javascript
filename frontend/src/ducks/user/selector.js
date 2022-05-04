export const getUserFromState = (state) => {
  return state.user.user;
};

export const getUserError = (state) => {
  return state.user.error;
};
