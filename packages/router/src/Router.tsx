import { App } from "@ikx/core";
import { MatchFunction, match as pathToReg } from "path-to-regexp";
import { ElementType } from "react";
import { MatchResult, RouteProps, LocationShape, RouterConfig } from "./types";
import createKey from "./createKey";

interface RuleMap {
  xpath: string;
  match: MatchFunction;
  groups: string[];
  name: string;
  component: ElementType;
}

export class Router {
  private readonly app: App;
  private readonly config: RouterConfig;
  private readonly routes: RouteProps[];
  private readonly cached: Record<string, string> = {};
  private readonly rules: RuleMap[] = [];
  private readonly onLocationChanged: (location: LocationShape) => void;

  constructor(
    app: App,
    onLocationChanged: (location: LocationShape) => void,
    routes: RouteProps[],
    config: RouterConfig
  ) {
    this.app = app;
    (this.onLocationChanged = onLocationChanged), (this.config = config);
    this.routes = routes;
    this.normalize(this.routes);
  }

  public bootstrap() {}

  private normalize(items: RouteProps[], parent: string = "") {
    items.forEach((x: RouteProps, index: number) => {
      x.xpath = `${parent}/r${index}h`;
      if (x.children?.length) {
        this.normalize(x.children, x.xpath);
      }
      this.rules.push({
        name: x.name,
        xpath: x.xpath,
        match: pathToReg(x.path),
        groups: x.groups ?? ["root"],
        component: x.component,
      });
    });
  }

  public cancel() {
    // to do others.
  }

  private matchLocal(
    url: string,
    group: string,
    fallback?: string
  ): Promise<MatchResult | undefined> {
    const urlObj = new URL(url, "http://locahost");
    const { pathname } = urlObj;

    console.log({ rules: this.rules });

    let item = this.rules.find((x) => {
      return (
        x.groups.includes(group) && (x.match(pathname) || x.match(pathname))
      );
    });

    if (!item && fallback) {
      item = this.rules.find((x) => {
        return x.groups.includes(group) && x.match(fallback);
      });
    }

    if (!item) {
      return Promise.resolve(undefined);
    }

    const found = item.match(url) || item.match(pathname);

    return Promise.resolve({
      name: item.name,
      component: item.component,
      pathname,
      query: Object.assign(
        Object.fromEntries(urlObj.searchParams),
        found ? found?.params : {}
      ),
    });
  }

  private async matchRemote(
    url: string,
    group: string
  ): Promise<MatchResult | undefined> {
    const { cache: enableCache, apiUrl, pageNotFound } = this.config;

    if (enableCache && this.cached[url]) {
      url = this.cached[url];
    }

    this.setLoading(true);

    return this.app.http
      .get(apiUrl, { params: { url, group } })
      .then((res) => {
        const returnUrl = (res.data?.data?.path as string) ?? pageNotFound;
        this.cached[url] = returnUrl;

        return returnUrl;
      })
      .then((url) => {
        return this.matchLocal(url, group);
      })
      .finally(() => {
        this.setLoading(false);
      });
  }

  public setLoading(loading: boolean) {
    if (loading) {
      // do nothing
    }
  }

  public async match(
    url: string,
    group: string = "root"
  ): Promise<MatchResult | undefined> {
    let result = await this.matchLocal(url, group);

    if (!result && this.config.apiUrl) {
      result = await this.matchRemote(url, group);
    }

    if (!result) {
      result = await this.matchLocal("/error/404", group);
    }

    if (result) {
      this.onLocationChanged({
        key: createKey(),
        query: result.query,
        pathname: url,
        state: {},
      });
    }

    return result;
  }

  public push(to?: unknown) {
    if (typeof to == "string") {
      history.pushState(null, "", to);
    }

    this.onLocationChanged({
      key: createKey(),
      pathname: to as string,
      query: {},
      state: {},
    });

    console.log({ push: to });
  }

  public replace(to?: unknown) {
    if (typeof to == "string") {
      history.pushState(null, "", to);
    }
  }
}

export default Router;