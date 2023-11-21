import { ElementType, ReactNode } from "react";

export interface LinkProps {
  [key: string]: unknown;
  href?: string;
  as?: string;
  onClick?: unknown;
  component?: ElementType;
}

export interface LocationShape {
  key: string;
  pathname: string;
  state: Record<string, unknown>;
  query: Record<string, unknown>;
}

export type MatchResult =
  | false
  | {
      name: string;
      from?: string;
      to?: string;
      component: ElementType;
      query: Record<string, unknown>;
      pathname: string;
    };

export interface RouterConfig {
  baseUrl: string;
  cache: boolean;
  pageNotFound: string;
  apiUrl: string;
}

export interface RouteProps {
  name: string;
  component: ElementType;
  path: string;
  xpath?: string;
  groups?: string[];
  children?: RouteProps[];
}

export interface TransRoute {
  xpath: string;
  path: string;
  component: ElementType;
  children?: TransRoute[];
}

export interface RouterProps {
  baseUrl?: string;
  routes: RouteProps[];
  children?: ReactNode;
}
