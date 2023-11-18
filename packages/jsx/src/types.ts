import { ElementType } from "react";
import { ViewName } from "@ikx/types";

export type ViewConfig = Record<string, ElementType>;

export interface RenderItemShape {
  component: ViewName;
  props?: Record<string, unknown>;

  [otherProps: string]: unknown;
}

export type RenderProps = RenderItemShape | RenderItemShape[];
