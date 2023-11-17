/* eslint-disable @typescript-eslint/no-explicit-any */
import { App } from "@ikx/app";

export default class Meter {
  [key: string]: any;

  public app: App;

  constructor(app: App) {
    this.app = app;
  }

  public bootstrap(app: App) {
    this.app = app;

    this.register();

    return this;
  }

  public postMessage(type: string, payload: unknown) {
    if (window?.parent) {
      window.parent.postMessage({ type: type, payload });
    }
  }

  public register() {
    /**
     * Listen onMessage callback
     */
    if (window?.addEventListener) {
      window.addEventListener("message", this.handleMessage.bind(this), false);
    }
  }

  public handleMessage(evt: MessageEvent<{ type: string; payload: unknown }>) {
    if (!evt.data?.type) return;

    const { type, payload } = evt.data;
    const fn = this[`on_${type}`];

    if (fn && /function/i.test(typeof fn)) {
      fn.bind(this)(payload);
    }
  }
}
