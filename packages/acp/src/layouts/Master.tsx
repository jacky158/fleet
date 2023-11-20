/**
 * @type: layout
 * @name: layout.master
 */

import { Box } from "@mui/material";
import { ReactNode, startTransition, useEffect, useReducer } from "react";
import Aside from "./Aside/Aside";
import Footer from "./Footer";
import Header from "./Header";
import { useApp } from "@ikx/core";

const DRAWER_CLOSED = "drawerOpened";

interface State {
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
  ww: number,
  choice: [unknown, unknown, unknown]
): T {
  if (ww >= 1280) {
    return choice[0] as T;
  } else if (ww >= 960) {
    return choice[1] as T;
  } else {
    return choice[2] as T;
  }
}

const getInitialState = (ww: number, startClosed: boolean): State => {
  return {
    innerWidth: ww,
    drawerVariant: sizingClamp<State["drawerVariant"]>(ww, [
      "permanent",
      "temporary",
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
};

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
          draft.drawerWidth = "var(--aside-dense-width)";
        }
        break;
    }
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

  console.log(app.localStore.get(DRAWER_CLOSED));

  return (
    <>
      <Header cx={state.drawerWidth} toggleDrawer={handleDrawer} />
      <Aside
        cx={state.drawerWidth}
        layout={state.drawerLayout}
        variant={state.drawerVariant}
        open={state.drawerOpened}
        onClose={() => dispatch({ type: "drawerClosed" })}
      />
      <Box
        sx={{
          paddingLeft: state.drawerWidth,
          transitionDuration: "250ms",
          transitionProperty: "padding-left",
        }}
      >
        <Box component="main">{children}</Box>
        <Footer />
      </Box>
    </>
  );
}
