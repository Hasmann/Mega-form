import AUTH_TYPES from "./auth.types";
import { put, takeLatest } from "redux-saga/effects";
import { setUserToken, failedTokenFetch } from "./auth.action";

export function* fetchCollectionsAsync() {
  try {
    const user = yield fetch("http://localhost:2007/api/v1/authUser", {
      method: "GET",
      credentials: "include", // Include cookies in the request
    });
    const setUser = yield user.json();
    yield put(setUserToken("TOKSSSSS"));
  } catch (error) {
    yield put(failedTokenFetch(error.message));
  }
}

export function* checkUserToken() {
  yield takeLatest(AUTH_TYPES.START_GETTING_TOKEN, fetchCollectionsAsync);
}
