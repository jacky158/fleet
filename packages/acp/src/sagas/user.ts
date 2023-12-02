/**
 * @type: saga
 * name: user.deleteUser
 */

import { getAppContext } from "@ikx/redux";
import { PagingState, RowValues } from "@ikx/types";
import { call, takeEvery } from "redux-saga/effects";

type RAction<P = Record<string, unknown>, M = never> = {
  type: string;
  payload: P;
  meta: M;
};

type RPagingAction<R extends RowValues = RowValues> = RAction<{
  paging: PagingState<R>;
}>;

function* deleteManyUser(action: RPagingAction) {
  const app = yield* getAppContext();
  const { paging } = action.payload;

  const ok = yield call(app.confirm, {
    message: "Are you sure?",
  });

  console.log({ ok });

  if (!ok) return;

  paging.remove(paging.selected);
}

const fns = takeEvery("@user/deleteMany", deleteManyUser);

export default fns;
