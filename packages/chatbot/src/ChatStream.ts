/* eslint-disable @typescript-eslint/no-explicit-any */
import { App } from "@ikx/core";
import io, { Socket } from "socket.io-client";

export default class ChatStream {
  private app: App;
  private socket?: Socket;
  private auth: object = {};

  constructor(app: App) {
    this.app = app;
  }

  public bootstrap(app: App) {
    this.app = app;

    return this;
  }

  public loadHistories() {
    // should emit load histories
  }

  private on_connect() {
    if (this.app) {
      this.socket?.emit("init_chat", this.auth);
    }
  }

  public connect(auth?: object) {
    /**
     * force re-connect
     */
    if (this.socket) {
      this.socket.close();
      delete this.socket;
    }

    this.auth = auth ?? this.app;

    /**
     * check info socket-io namespace
     */
    const namespace = "/chatbot";

    this.socket = io(`${document.location.host}${namespace}`, {
      /* check document to know about path */
      path: "/chatbot/socket.io",
      /* post auth data to verify connect */
      auth: this.auth,
      /* force to socket may be failed connect via proxy. */
      transports: ["websocket"],
      upgrade: false,
    });

    this.socket.on("connect", this.on_connect.bind(this));
  }
}
