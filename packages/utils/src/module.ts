import compactData from "./compactData";
import compactUrl from "./compactUrl";
import colorHash from "./colorHash";

declare module "@ikx/core" {
  export interface App {
    compactUrl: typeof compactUrl;
    compactData: typeof compactData;
    colorHash: typeof colorHash;
  }
}
