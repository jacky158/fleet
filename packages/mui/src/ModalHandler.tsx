import { last } from "lodash";
import { useMemo, useReducer } from "react";
import { ModalApi, OpenModalProps } from "@ikx/types";
import { Backdrop } from "@mui/material";
import { useApp } from "@ikx/core";

export interface State {
  items: OpenModalProps[];
  current?: OpenModalProps;
}

export type Action =
  | { type: "open"; payload: OpenModalProps }
  | { type: "push"; payload: OpenModalProps }
  | { type: "pop" }
  | { type: "onTransitionExited" }
  | { type: "onClose"; payload: "backdropClick" | "escapeKeyDown" }
  | { type: "replace"; payload: OpenModalProps };
let index = 0;

const uniqueId = (): string => {
  index += 1;
  return index.toString();
};

export default function ModalHandler() {
  const app = useApp();

  const [state, dispatch] = useReducer(
    (draft: State, action: Action) => {
      switch (action.type) {
        case "open":
          draft.items = draft.items.map((x) => ({
            ...x,
          }));
          draft.items.push(action.payload);

          return {
            ...draft,
            items: draft.items.filter(Boolean),
          };
        case "push": {
          // draft.items = draft.items.map((x) => ({ ...x, open: false }));
          return {
            ...draft,
            items: [...draft.items, action.payload],
          };
        }
        case "onTransitionExited": {
          draft.items.pop();
          return {
            ...draft,
            items: draft.items.filter(Boolean),
          };
        }
        case "pop": {
          const current = last(draft.items);
          if (current) {
            current.open = false;
          }

          return {
            ...draft,
            items: draft.items.filter(Boolean),
          };
        }
        case "onClose": {
          return {
            ...draft,
            current: { ...draft.current, open: false } as State["current"],
          };
        }
      }
      return draft;
    },
    {
      items: [],
      current: undefined,
    } as unknown as State
  );

  const modal = useMemo(() => {
    return {
      open(payload: OpenModalProps): void {
        dispatch({
          type: "open",
          payload: {
            ...payload,
            open: true,
            key: uniqueId(),
            onClose: app.modal.onClose,
            onTransitionExited: app.modal.onTransitionExited,
            slotProps: { backdrop: { sx: { visibility: "hidden" } } },
          },
        });
      },
      push: function (payload: OpenModalProps): void {
        dispatch({
          type: "push",
          payload: {
            ...payload,
            open: true,
            key: uniqueId(),
            onClose: app.modal.onClose,
            onTransitionExited: app.modal.onTransitionExited,
            slotProps: { backdrop: { sx: { visibility: "hidden" } } },
          },
        });
      },
      replace: function (payload: OpenModalProps): void {
        dispatch({ type: "replace", payload });
      },
      pop: function (): void {
        dispatch({ type: "pop" });
      },
      onClose(_, reason) {
        dispatch({ type: "onClose", payload: reason });
      },
      setUserConfirm(shouldConfirm: boolean, params: unknown): void {
        if (shouldConfirm || params) {
          // todo implement later
        }
      },
      onTransitionExited() {
        dispatch({ type: "onTransitionExited" });
      },
    } as ModalApi;
  }, []);

  app.extend({ modal });

  if (!state) return null;

  if (!state.items.length) return null;

  const total = state.items.length;

  return (
    <>
      <Backdrop open sx={{ zIndex: 1001 }} />
      {state.items.map(({ modal: C, ...props }, index) => {
        return <C {...props} sx={index < total - 1 ? { opacity: 0 } : {}} />;
      })}
    </>
  );
}
