import { createSelector } from "reselect";

const selectAuth = (state) => {
  return state.auth;
};

export const selectAuthToken = createSelector(
  [selectAuth],
  (auth) => auth.token
);
