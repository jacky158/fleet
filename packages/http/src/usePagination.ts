import { useApp } from "@ikx/core";
import { Dispatch, useEffect, useReducer } from "react";

interface Paging<R, Q> {
  loadingMore: boolean;
  loading: boolean;
  url: string;
  rev: number;
  items: R[];
  page: number; // current_page
  limit: number;
  count: number; // total item
  pages: number; // total page
  perPageOptions?: number[];
  query: Q;
}

interface PagingApi<Q> {
  removeItem(id: string | number): void;
  loadMore(): void;
  setPage(page: number): void;
  setLimit(page: number): void;
  setUrl(url: string): void;
  setQuery(query: Q): void;
  refresh(): void;
}

type Action<Q> =
  | { type: "setUrl"; payload: string }
  | { type: "setLimit"; payload: number }
  | { type: "setPage"; payload: number }
  | { type: "setQuery"; payload: Q }
  | { type: "setResult"; payload: any }
  | { type: "removeItem"; payload: string | number }
  | { type: "refresh" }
  | { type: "setError" }
  | { type: "loadMore" };

export function usePagination<
  R extends { id: unknown },
  Q = Record<string, unknown>
>({
  url,
  limit,
  perPageOptions,
}: {
  url: string;
  page: number;
  limit?: number;
  query: Q;
  rev?: number;
  perPageOptions: number[];
}): [Paging<R, Q>, Dispatch<Action<Q>>, PagingApi<Q>] {
  const { http } = useApp();
  const [state, dispatch] = useReducer(
    (draft: Paging<R, Q>, action: Action<Q>) => {
      switch (action.type) {
        case "setPage":
          draft.page = action.payload;
          draft.rev = draft.rev + 1;
          draft.loading = true;
          break;
        case "removeItem":
          return {
            ...draft,
            items: draft.items.filter((x) => x.id != action.payload),
          };
        case "setQuery":
          draft.items = [];
          draft.query = action.payload;
          draft.rev = draft.rev + 1;
          draft.loading = true;
          break;
        case "refresh":
          draft.rev = draft.rev + 1;
          draft.loading = true;
          break;
        case "setLimit":
          draft.limit = action.payload;
          draft.rev = draft.rev + 1;
          draft.loading = true;
          break;
        case "loadMore":
          if (draft.loading || draft.page >= draft.pages) {
            // do nothing
            console.log("skip load more");
            return draft;
          }
          draft.loading = true;
          draft.loadingMore = true;
          draft.page = draft.page + 1;
          draft.rev = draft.rev + 1;
          break;
        case "setError":
          break;

        case "setResult": {
          const {
            data,
            meta: { pagination },
          } = action.payload;
          draft.loading = false;
          if (draft.loadingMore) {
            draft.loadingMore = false;
            draft.items = [...draft.items, ...data];
          } else {
            draft.items = data;
          }
          draft.page = pagination.page;
          draft.pages = pagination.pages;
          draft.limit = pagination.limit;
          draft.count = pagination.count;
          break;
        }
      }

      return { ...draft };
    },
    {
      url,
      loading: true,
      rev: 0,
      page: 1,
      pages: 0,
      count: 0,
      limit: limit ?? perPageOptions[0],
      query: {} as Q,
      items: [],
      loadingMore: false,
    }
  );

  function setResult(data: any) {
    return dispatch({ type: "setResult", payload: data });
  }

  const api: PagingApi<Q> = {
    setPage(page: number) {
      dispatch({ type: "setPage", payload: page });
    },
    setLimit(limit: number) {
      dispatch({ type: "setLimit", payload: limit });
    },
    setUrl(url: string) {
      dispatch({ type: "setUrl", payload: url });
    },
    setQuery(filter: Q) {
      dispatch({ type: "setQuery", payload: filter });
    },
    refresh() {
      dispatch({ type: "refresh" });
    },
    loadMore() {
      dispatch({ type: "loadMore" });
    },
    removeItem(id: string | number) {
      dispatch({ type: "removeItem", payload: id });
    },
  };

  useEffect(() => {
    let mounted = true;
    const load = () =>
      http
        .get(state.url, {
          params: { ...state.query, page: state.page, limit: state.limit },
        })
        .then((res) => {
          if (mounted) {
            setResult(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });

    load();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.rev]);

  return [state, dispatch, api];
}

export default usePagination;
