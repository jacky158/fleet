import { ElementType } from "react";

export type ViewConfig = Record<string, ElementType>;

export interface RenderItemShape {
  component: string | React.ElementType;
  props?: Record<string, unknown>;

  [otherProps: string]: unknown;
}

export type RenderProps = RenderItemShape | RenderItemShape[];
