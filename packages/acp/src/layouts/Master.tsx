/**
 * @type: layout
 * @name: layout.master
 */

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactNode, startTransition, useEffect, useReducer } from "react";
import Aside from "./Aside/Aside";
import Header from "./Header";
import { useApp } from "@ikx/core";

const DRAWER_CLOSED = "drawerOpened";

interface State {
  dx: string;
  innerWidth: number;
  desktop: boolean;
  tablet: boolean;
  drawerVariant: "permanent" | "temporary";
  drawerOpened: boolean;
  drawerWidth: string;
  drawerLayout: "compact" | "full";
}

type Action =
  | {
      type: "toggleDrawer";
    }
  | {
      type: "drawerClosed";
    };

function sizingClamp<T = string>(
  width: number,
  choice: [unknown, unknown, unknown]
): T {
  if (width >= 1280) {
    return choice[0] as T;
  } else if (width >= 960) {
    return choice[1] as T;
  } else {
    return choice[2] as T;
  }
}

const getInitialState = (ww: number, startClosed: boolean): State => {
  const draft = {
    innerWidth: ww,
    drawerVariant: sizingClamp<State["drawerVariant"]>(ww, [
      "permanent",
      "permanent",
      "temporary",
    ]),
    desktop: sizingClamp<boolean>(ww, [true, false, false]),
    tablet: sizingClamp<boolean>(ww, [true, true, false]),
    drawerOpened: sizingClamp<boolean>(ww, [!startClosed, !startClosed, false]),
    drawerWidth: sizingClamp(ww, [
      startClosed ? "0px" : "var(--aside-width)",
      startClosed ? "0px" : "var(--aside-dense-width)",
      "0px",
    ]),
    drawerLayout: sizingClamp<State["drawerLayout"]>(ww, [
      "full",
      "compact",
      "full",
    ]),
  } as State;

  draft.dx = draft.drawerVariant == "permanent" ? draft.drawerWidth : "0px";

  return draft;
};

const Main = styled("main")({
  minHeight: "calc(100vh - 100px)",
});

export default function Layout({ children }: { children: ReactNode }) {
  const app = useApp();
  const startClosed = app.localStore.get(DRAWER_CLOSED) == "y";
  const ww = window.innerWidth;
  const [state, dispatch] = useReducer((draft: State, action: Action) => {
    switch (action.type) {
      case "toggleDrawer":
        draft.drawerOpened = !draft.drawerOpened;
        if (draft.innerWidth >= 1280) {
          draft.drawerLayout = "full";
          draft.drawerWidth = draft.drawerOpened ? "var(--aside-width)" : "0px";
        } else if (draft.innerWidth >= 960) {
          draft.drawerLayout = "compact";
          draft.drawerWidth = draft.drawerOpened
            ? "var(--aside-dense-width)"
            : "0px";
        } else {
          // draft.drawerVariant = "temporary";
          draft.drawerLayout = "full";
          draft.drawerWidth = "var(--aside-width)";
        }
        break;
      case "drawerClosed": {
        draft.drawerOpened = false;
        if (!draft.drawerOpened) {
          draft.drawerWidth = "0px";
        }

        return { ...draft };
      }
    }
    draft.dx = draft.drawerVariant == "permanent" ? draft.drawerWidth : "0px";
    return { ...draft };
  }, getInitialState(ww, startClosed));

  const handleDrawer = () => {
    startTransition(() => dispatch({ type: "toggleDrawer" }));
  };

  useEffect(() => {
    if (state.drawerOpened) {
      app.localStore.remove(DRAWER_CLOSED);
    } else {
      app.localStore.set(DRAWER_CLOSED, "y");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.drawerOpened]);

  return (
    <>
      <Header dx={state.dx} toggleDrawer={handleDrawer} />
      <Aside
        width={state.drawerWidth}
        layout={state.drawerLayout}
        variant={state.drawerVariant}
        open={state.drawerOpened}
        onClose={() => dispatch({ type: "drawerClosed" })}
      />
      <Box
        sx={{
          paddingLeft: state.dx,
          transitionDuration: "250ms",
          transitionProperty: "padding-left",
        }}
      >
        <Main>{children}</Main>
      </Box>
    </>
  );
}
