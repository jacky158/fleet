/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadResult, PagingAction, PagingState, RowValues } from "@ikx/types";
import { Dispatch, useCallback, useEffect, useReducer, useRef } from "react";

const noop = () => {};

export interface CreatePagingProps<
  R extends RowValues = RowValues,
  Q = unknown
> {
  size?: string;
  page?: number;
  limit?: number;
  query?: Q;
  rev?: number;
  perPageOptions?: number[];
  loader(q?: unknown): Promise<LoadResult<R[]>>;
}

export function usePagination<R extends RowValues, Q = Record<string, unknown>>(
  props: CreatePagingProps<R, Q>
): PagingState<R, Q> {
  const mounted = useRef<boolean>(true);
  const dispatcher = useRef<Dispatch<PagingAction<R, Q>>>(
    noop as unknown as Dispatch<PagingAction<R, Q>>
  );
  const initPagination = useCallback(
    (props: CreatePagingProps<R, Q>): PagingState<R, Q> => {
      const dispatch = (action: PagingAction<R, Q>) => {
        dispatcher.current(action);
      };
      return {
        loading: true,
        rev: 0,
        page: props.page ?? 0,
        pages: 0,
        count: undefined,
        limit: props.limit ?? 20,
        query: props.query ?? ({} as Q),
        perPageOptions: props.perPageOptions ?? [20, 50],
        selectStatus: "none",
        size: props.size ?? "medium",
        items: [],
        selected: [],
        loadingMore: false,
        loader: props.loader,
        dispatch,
        setPage(payload: number) {
          dispatch({ type: "setPage", payload });
        },
        setLimit(payload: number) {
          dispatch({ type: "setLimit", payload });
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
        remove(payload: unknown) {
          dispatch({ type: "remove", payload });
        },
        select(id: unknown, checked?: boolean) {
          dispatch({ type: "select", id, checked });
        },
        selectAll(payload: boolean) {
          dispatch({ type: "selectAll", payload });
        },
        load() {
          dispatch({ type: "load" });
        },
      } as PagingState<R, Q>;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    []
  );

  const [state, dispatch] = useReducer(
    (draft: PagingState<R, Q>, action: PagingAction<R, Q>) => {
      switch (action.type) {
        case "setPage":
          draft.page = action.payload;
          draft.rev = draft.rev + 1;
          draft.loading = true;
          break;
        case "remove": {
          const id = action.payload;
          if (Array.isArray(id)) {
            draft.items = draft.items.filter((x: any) => !id.includes(x.id));
          } else {
            draft.items = draft.items.filter((x: any) => x.id != id);
          }
          break;
        }
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
            const p = meta.pagination;
            if (p.page) {
              draft.page = p.page;
            }
            if (p.pages) {
              draft.pages = p.pages;
            }
            if (p.limit) {
              draft.limit = p.limit;
            }
            if (p.count) {
              draft.count = p.count;
            }
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
          {
            const checked = action.payload ?? draft.selectStatus != "none";
            if (!checked) {
              draft.selected = draft.items.map((x: any) => x.id);
            } else {
              draft.selected = [];
            }
          }
          break;
        case "load": {
          const params = {
            ...draft.query,
            loading: true,
            page: draft.page,
            limit: draft.limit,
          };
          draft
            .loader(params)
            .then((data) => {
              console.log("load data", data);
              dispatch({ type: "setResult", payload: data });
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }
      if (!draft.selected.length) {
        draft.selectStatus = "none";
      } else if (draft.selected.length == draft.items.length) {
        draft.selectStatus = "all";
      } else {
        draft.selectStatus = "indeterminate";
      }

      return { ...draft };
    },
    props,
    initPagination
  );
  // avoid un-initialize function.
  dispatcher.current = dispatch;

  useEffect(() => {
    state.load();
    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.rev]);

  return state;
}

export default usePagination;
