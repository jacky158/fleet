import debounce from "lodash/debounce";
import { RefObject, useEffect } from "react";

function getDocHeight() {
  const x = document;

  return Math.max(
    x.body.scrollHeight,
    x.documentElement.scrollHeight,
    x.body.offsetHeight,
    x.documentElement.offsetHeight,
    x.body.clientHeight,
    x.documentElement.clientHeight
  );
}

export function useScrollEnd(
  cb?: () => void,
  scrollRef?: RefObject<HTMLElement | null>,
  threshold: number = 200,
  bounceMs: number = 500
): void {
  const node = scrollRef?.current;

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
          if (window.scrollY + window.innerHeight * 2 > getDocHeight()) {
            cb();
          }
        };

    const bounce = debounce(handle, bounceMs, { leading: true });

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
