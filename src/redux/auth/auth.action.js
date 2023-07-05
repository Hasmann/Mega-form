import AUTH_TYPES from "./auth.types";

export const startTokenFetch = () => {
  return {
    type: AUTH_TYPES.START_GETTING_TOKEN,
  };
};

export const setUserToken = (tokenPayload) => {
  return {
    type: AUTH_TYPES.SET_USER_TOKEN,
    payload: tokenPayload,
  };
};

export const failedTokenFetch = () => {
  return {
    type: AUTH_TYPES.GETTING_TOKEN_FAILED,
  };
};
