import compactData from "./compactData";
import compactUrl from "./compactUrl";
import colorHash from "./colorHash";

declare module "@ikx/app" {
  export interface App {
    compactUrl: typeof compactUrl;
    compactData: typeof compactData;
    colorHash: typeof colorHash;
  }
}
