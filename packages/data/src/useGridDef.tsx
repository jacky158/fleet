import {
  CreateGridDefProps,
  GridDefAction,
  GridDefState,
  RowValues,
} from "@ikx/types";
import { Dispatch, useCallback, useReducer, useRef } from "react";

function noop() {}

export function useGridDef<R extends RowValues = RowValues>(
  props: CreateGridDefProps<R>
) {
  const dispatcher = useRef<Dispatch<GridDefAction<R>>>(
    noop as Dispatch<GridDefAction<R>>
  );

  const initGridState = useCallback(
    (props: CreateGridDefProps<R>): GridDefState<R> => {
      const dispatch = (action: GridDefAction<R>) => {
        dispatcher.current(action);
      };
      return {
        columns: props.columns,
        rowsPerPageOptions: props.rowsPerPageOptions ?? [20, 40, 60],
        size: props.size ?? "medium",
        dispatch,
        setSize(payload: GridDefState<R>["size"]) {
          dispatch({ type: "setSize", payload });
        },
      } as GridDefState<R>;
    },
    []
  );

  const [state, dispatch] = useReducer(
    (draft: GridDefState<R>, action: GridDefAction<R>) => {
      switch (action.type) {
        case "setSize":
          draft.size = action.payload;
          break;
      }
      return { ...draft };
    },
    props,
    initGridState
  );

  dispatcher.current = dispatch;

  return state;
}

export default useGridDef;
