/**
 * @type: layout
 * @name: layout.master
 */

import { Box, useMediaQuery, useTheme } from "@mui/material";
import { ReactNode, startTransition, useReducer, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Aside from "./Aside/Aside";

interface State {
  innerWidth: number;
  desktop: boolean;
  tablet: boolean;
  drawerVariant: "permanent" | "temporary";
  drawerOpened: boolean;
  drawerWidth: string;
  drawerLayout: "dense" | "full";
}

type Action =
  | {
      type: "toggleDrawer";
    }
  | {
      type: "drawerClosed";
    };

function clamp<T = string>(ww: number, choice: [unknown, unknown, unknown]): T {
  if (ww >= 1280) {
    return choice[0] as T;
  } else if (ww >= 960) {
    return choice[1] as T;
  } else {
    return choice[2] as T;
  }
}

export default function Layout({ children }: { children: ReactNode }) {
  const ww = window.innerWidth;
  const [state, dispatch] = useReducer(
    (draft: State, action: Action) => {
      switch (action.type) {
        case "toggleDrawer":
          draft.drawerOpened = !draft.drawerOpened;
          if (draft.innerWidth >= 1280) {
            draft.drawerLayout = "full";
            draft.drawerWidth = draft.drawerOpened
              ? "var(--aside-width)"
              : "0px";
          } else if (draft.innerWidth >= 960) {
            draft.drawerLayout = "dense";
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
    },
    {
      innerWidth: ww,
      drawerVariant: clamp<State["drawerVariant"]>(ww, [
        "permanent",
        "permanent",
        "temporary",
      ]),
      desktop: clamp<boolean>(ww, [true, false, false]),
      tablet: clamp<boolean>(ww, [true, true, false]),
      drawerOpened: clamp<boolean>(ww, [true, true, false]),
      drawerWidth: clamp(ww, [
        "var(--aside-width)",
        "var(--aside-dense-width)",
        "0px",
      ]),
      drawerLayout: clamp<State["drawerLayout"]>(ww, [
        "full",
        "dense",
        "dense",
      ]),
    }
  );

  const handleDrawer = () => {
    startTransition(() => dispatch({ type: "toggleDrawer" }));
  };

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
