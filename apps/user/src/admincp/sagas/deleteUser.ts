/**
 * @type: saga
 * @name: user.deleteUser
 * @bundle: admincp
 */

import { getAppContext } from "@ikx/redux";
import { RItemAction } from "@ikx/types";
import { takeEvery } from "redux-saga/effects";

function* deleteManyUser(action: RItemAction) {
  const app = yield* getAppContext();
  const { item, paging } = action.payload;

  const ok: boolean = yield app.confirm({ message: "Are you sure?" });

  if (!ok) return;

  if (paging) {
    yield paging.remove(item.id);
  }

  console.log(`should delete ${item.id}`);
}

const fns = takeEvery("@user/deleteUser", deleteManyUser);

export default fns;
