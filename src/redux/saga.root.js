import { all, call } from "redux-saga/effects";
import { checkUserToken } from "./auth/auth.saga";

export default function* sagaRoot() {
  yield all([call(checkUserToken)]);
}
