/**
 * @type: service
 * name: jsxBackend
 */
import { App } from "@ikx/core";
import isString from "lodash/isString";
import React, { ElementType, ReactNode } from "react";
import { isValidElementType } from "react-is";
import { ViewConfig, RenderItemShape, RenderProps } from "./types";

/**
 * JsxBackend provider virtual component map by name => element type
 *
 */
export default class JsxBackend {
  /**
   * Configuration key.
   */
  public static readonly configKey: string = "views";

  // eslint-disabled
  private app: App;

  /**
   * store all views
   */
  private data: ViewConfig;

  constructor(app: App, data: ViewConfig) {
    this.app = app;
    this.data = data;
    this.extend = this.extend.bind(this);
  }

  public bootstrap() {
    // define bootstrap
  }

  /**
   * Extending current configure
   *
   * @param {ViewConfig} opts - a dictionary of Jsx Component
   */
  public extend(opts: ViewConfig) {
    if (this.app) {
      // do nothing
    }
    Object.keys(opts).forEach((key) => {
      this.data[key] = opts[key];
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public get<T = any>(
    tagName: string | undefined | React.ElementType
  ): ElementType<T> {
    return (isString(tagName) && this.data[tagName]
      ? this.data[tagName]
      : undefined) as unknown as React.ElementType<T>;
  }

  public find(fn: (key: string) => boolean): string[] {
    return Object.keys(this.data).filter(fn);
  }

  /**
   * Get all jsx component map
   * @returns
   */
  public getAll(): ViewConfig {
    return this.data;
  }

  /**
   *
   * @param {String} tagName - name of component or tags
   * @returns boolean
   */
  public has(tagName: string): boolean {
    return "string" === typeof tagName && this.data[tagName] !== undefined;
  }

  /**
   *
   * @param {RenderProps} item  - array or single render item
   * @param {Function} filter (optional) - filter
   * @returns -  ReactNode
   */
  public render(
    item: RenderProps,
    filter?: (c: RenderItemShape, index: number) => boolean
  ): ReactNode {
    if (Array.isArray(item)) {
      if (filter) {
        return item.filter(filter).map((c) => this.render(c));
      } else {
        return item.map((c) => this.render(c)).filter(Boolean);
      }
    } else if (item?.component) {
      let { component: tag } = item;
      const { props } = item;

      if ("string" === typeof tag && this.data[tag]) {
        tag = this.data[tag];
      } else if (!isValidElementType(tag)) {
        return null;
      } else if ("string" === typeof tag) {
        if (!/div|span|p|h1|h2|h3|h4|h5|h6|b|i|img/i.test(tag)) return null;
      }

      return React.createElement(tag, props);
    }

    return null;
  }
}
