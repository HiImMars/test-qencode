export const handlePending = (state) => {
  state.isLoading = true;
  state.isRefreshing = true;
};

export const handleFulfilledSignUpLogIn = (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
  state.isLoading = false;
};

export const handleFulfilledLogOut = (state, action) => {
  state.user = { name: "", email: "", password: "" };
  state.token = "";
  state.isLoggedIn = false;
  state.isLoading = false;
};

export const handleFulfilledRefreshUser = (state, action) => {
  state.user = action.payload;
  state.isLoggedIn = true;
  state.isRefreshing = false;
  state.isLoading = false;
};
export const handleRejected = (state) => {
  state.isLoading = false;
  state.isRefreshing = false;
};
