/**
 * @type: saga
 * @name: user.deleteManyUser
 * @bundle: admincp
 */

import { getAppContext } from "@ikx/redux";
import { RListAction } from "@ikx/types";
import { takeEvery } from "redux-saga/effects";

function* deleteManyUser(action: RListAction) {
  const app = yield* getAppContext();
  const { paging } = action.payload;

  const ok: boolean = yield app.confirm({ message: "Are you sure?" });

  if (!ok) return;

  yield paging.remove(paging.selected);
}

const fns = takeEvery("@user/deleteManyUser", deleteManyUser);

export default fns;
