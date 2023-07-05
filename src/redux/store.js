import { legacy_createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import rootReducer from "./rootReducer";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import sagaRoot from "./saga.root";

const sagaMiddleware = createSagaMiddleware();
//remember to add sagaMiddleware to middlewares array
const middlewares = [logger, sagaMiddleware];

export const store = legacy_createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);
sagaMiddleware.run(sagaRoot);
export const persistor = persistStore(store);
