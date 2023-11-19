import { ElementType } from "react";

interface RouteProps {
  component: ElementType;
  path: string;
}

export function createRouter(routes: RouteProps[]) {}
