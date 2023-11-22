import { App } from "@ikx/core";
import { MatchFunction, match as pathToReg } from "path-to-regexp";
import { ElementType } from "react";
import { MatchResult, RouteProps, LocationShape, RouterConfig } from "./types";
import createKey from "./createKey";

interface RuleMap {
  xpath: string;
  match: MatchFunction;
  base: string;
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
        base: x.base ?? "root",
        component: x.component,
      });
    });
  }

  public cancel() {
    // to do others.
  }

  private matchLocal(
    url: string,
    base: string
  ): Promise<MatchResult | undefined> {
    const urlObj = new URL(url, "http://locahost");
    const { pathname } = urlObj;

    console.log({ pathname });

    const item = this.rules.find((x) => {
      return x.base == base && (x.match(pathname) || x.match(url));
    });

    const based = this.rules.find((x) => {
      return x.base == base;
    });

    console.log({ based });

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
    base: string
  ): Promise<MatchResult | undefined> {
    const { cache: enableCache, apiUrl, pageNotFound } = this.config;

    if (enableCache && this.cached[url]) {
      url = this.cached[url];
    }

    this.setLoading(true);

    return this.app.http
      .get(apiUrl, { params: { url, base } })
      .then((res) => {
        const returnUrl = (res.data?.data?.path as string) ?? pageNotFound;
        this.cached[url] = returnUrl;

        return returnUrl;
      })
      .then((url) => {
        return this.matchLocal(url, base);
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
    base: string = "root"
  ): Promise<MatchResult | undefined> {
    let result = await this.matchLocal(url, base);

    if (!result && this.config.apiUrl) {
      result = await this.matchRemote(url, base);
    }

    if (!result) {
      result = await this.matchLocal("/error/404", base);
    }

    if (result && base == "root") {
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
