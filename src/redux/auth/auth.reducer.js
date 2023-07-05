import AUTH_TYPES from "./auth.types";
const INITIAL_STATE = {
  token: "",
  errorMessage: "",
  isFetching: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_TYPES.START_GETTING_TOKEN:
      return {
        ...state,
        isFetching: true,
      };
    case AUTH_TYPES.SET_USER_TOKEN:
      return {
        ...state,
        token: action.payload,
        isFetching: false,
      };
    case AUTH_TYPES.GETTING_TOKEN_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};
export default authReducer;
