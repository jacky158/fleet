import debounce from "lodash/debounce";
import { MutableRefObject, useEffect } from "react";

export function useScrollEnd(
  cb: () => void,
  scrollRef?: MutableRefObject<HTMLElement>,
  threshold: number = 200,
  bounceMs: number = 200
): () => void {
  useEffect(() => {
    const node = scrollRef?.current;

    if (!node) {
      return () => void 0;
    }

    const handle = () => {
      if (threshold > node.scrollWidth - node.scrollLeft - node.clientWidth) {
        cb();
      }
    };

    const bounce = debounce(handle, bounceMs, { leading: true });

    node.addEventListener("scroll", bounce);

    return () => node.removeEventListener("scroll", bounce);
  }, [bounceMs, cb, scrollRef, threshold]);

  return cb;
}

export default useScrollEnd;
