import { App } from "@ikx/core";
import { getContext } from "redux-saga/effects";

export default function* getAppContext(): Generator<unknown, App> {
  return (yield getContext("APP")) as App;
}
