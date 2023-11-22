import debounce from "lodash/debounce";
import { useEffect } from "react";
import { useScrollRef } from ".";

export function useScrollEnd(
  cb?: () => void,
  threshold: number = 200,
  bounceMs: number = 500
): void {
  const { current: node } = useScrollRef();

  useEffect(() => {
    if (!cb) {
      return undefined;
    }

    const handle = node
      ? () => {
          if (
            threshold >
            node.scrollHeight - node.scrollTop - node.clientHeight
          ) {
            cb();
          }
        }
      : () => {
          if (window.scrollY + window.innerHeight * 2 > window.innerHeight) {
            cb();
          }
        };

    const bounce = debounce(handle, bounceMs, { leading: false });

    if (node) {
      node.addEventListener("scroll", bounce);

      return () => node.removeEventListener("scroll", bounce);
    }

    window.addEventListener("scroll", bounce);

    return () => window.removeEventListener("scroll", bounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node]);
}

export default useScrollEnd;
