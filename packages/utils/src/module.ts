import compactData from "./compactData";
import compactUrl from "./compactUrl";
import colorHash from "./colorHash";
import Cookies from "universal-cookie";
import LocalStore from "./LocalStore";
import Colorize from "./colorize";

declare module "@ikx/core" {
  export interface App {
    readonly compactUrl: typeof compactUrl;
    readonly compactData: typeof compactData;
    readonly colorHash: typeof colorHash;
    readonly cookies: Cookies;
    readonly localStore: LocalStore;
    readonly colorize: Colorize;
  }
}
