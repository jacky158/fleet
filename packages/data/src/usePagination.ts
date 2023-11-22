/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, useEffect, useReducer, useRef } from "react";
import { LoadResult, PagingState, PagingApi, PagingAction } from "@ikx/types";

export class Api<R, Q> implements PagingApi<R, Q> {
  public dispatch?: Dispatch<PagingAction<R, Q>>;

  d(action: PagingAction<R, Q>) {
    if (this.dispatch) {
      this.dispatch(action);
    }
  }

  setPage(page: number) {
    this.d({ type: "setPage", payload: page });
  }
  setLimit(limit: number) {
    this.d({ type: "setLimit", payload: limit });
  }
  setUrl(url: string) {
    this.d({ type: "setUrl", payload: url });
  }
  setQuery(filter: Q) {
    this.d({ type: "setQuery", payload: filter });
  }
  refresh() {
    this.d({ type: "refresh" });
  }
  loadMore() {
    this.d({ type: "loadMore" });
  }
  removeItem(id: string | number) {
    this.d({ type: "removeItem", payload: id });
  }
  select(id: unknown, checked?: boolean) {
    this.d({ type: "select", id, checked });
  }
  selectAll(select: boolean) {
    this.d({ type: "selectAll", payload: select });
  }
  load() {
    this.d({ type: "load" });
  }
}

export function usePagination<R, Q = Record<string, unknown>>({
  url,
  limit,
  page,
  query,
  perPageOptions,
  loader,
}: {
  url: string;
  page?: number;
  limit?: number;
  query?: Q;
  rev?: number;
  perPageOptions?: number[];
  loader(q?: unknown): Promise<LoadResult<R[]>>;
}): PagingState<R, Q> {
  const mounted = useRef<boolean>(true);
  const [state, dispatch] = useReducer(
    (draft: PagingState<R, Q>, action: PagingAction<R, Q>) => {
      switch (action.type) {
        case "setPage":
          draft.page = action.payload;
          draft.rev = draft.rev + 1;
          draft.loading = true;
          break;
        case "removeItem":
          return {
            ...draft,
            items: draft.items.filter((x: any) => x.id != action.payload),
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
          const { data, meta } = action.payload;
          draft.loading = false;
          if (draft.loadingMore) {
            draft.loadingMore = false;
            draft.items = [...draft.items, ...data];
          } else {
            draft.items = data;
          }
          if (meta?.pagination) {
            draft.page = meta.pagination.page;
            draft.pages = meta.pagination.pages;
            draft.limit = meta.pagination.limit;
            draft.count = meta.pagination.count;
          }

          break;
        }
        case "select":
          {
            const id = action.id;
            const checked = action.checked ?? !draft.selected.includes(id);

            console.log(action, checked, id);

            if (!checked) {
              draft.selected = draft.selected.filter((x) => x != id);
            } else {
              draft.selected = [...draft.selected, id];
            }
          }
          break;
        case "selectAll":
          if (action.payload) {
            draft.selected = draft.items.map((x: any) => x.id);
          } else {
            draft.selected = [];
          }
          break;
        case "load": {
          const params = {
            ...draft.query,
            page: draft.page,
            limit: draft.limit,
          };
          draft
            .loader(params)
            .then((data) => {
              console.log("load data");
              dispatch({ type: "setResult", payload: data });
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }
      return { ...draft };
    },
    {
      url,
      loading: true,
      rev: 0,
      page: page ?? 1,
      pages: 0,
      count: 0,
      limit: limit ?? 20,
      query: query ?? ({} as Q),
      perPageOptions: perPageOptions ?? [20, 50],
      items: [],
      selected: [],
      loadingMore: false,
      loader,
      api: new Api(),
    }
  );

  useEffect(() => {
    state.api.dispatch = dispatch;

    state.api.load();
    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.rev]);

  return state;
}

export default usePagination;
