/**
 * @type: saga
 * name: user.deleteUser
 */

import { takeEvery } from "redux-saga/effects";

function* deleteUser(action: unknown) {
  console.log(action);
  yield;
}

const fns = takeEvery("@user/delete", deleteUser);

export default fns;
