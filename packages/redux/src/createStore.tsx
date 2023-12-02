/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ReducersMapObject,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { App } from "@ikx/core";

export default function createStore({
  reducers,
  sagas,
  app,
}: {
  reducers: ReducersMapObject<unknown, any>;
  sagas: any[];
  app: App;
}) {
  const sagaMiddleware = createSagaMiddleware({
    context: { APP: app },
  });

  const rootSaga = function* () {
    try {
      yield all(sagas.flat());
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  };

  const store = configureStore({
    reducer: combineReducers(reducers),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).prepend(sagaMiddleware),
  });

  sagaMiddleware.run(rootSaga);

  return store;
}
