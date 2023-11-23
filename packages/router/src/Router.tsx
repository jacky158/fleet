import { App } from "@ikx/core";
import { MatchFunction, match as pathToReg } from "path-to-regexp";
import { ElementType } from "react";
import { MatchResult, RouteProps, LocationShape, RouterConfig } from "./types";
import createKey from "./createKey";

interface RuleMap {
  xpath: string;
  match: MatchFunction;
  parent: string;
  name: string;
  component: ElementType;
}

const ROOT = "";

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

  private normalize(items: RouteProps[], parent: string = ROOT) {
    items.forEach((x: RouteProps, index: number) => {
      x.xpath = `${parent}/r${index}h`;
      if (x.children?.length) {
        this.normalize(x.children, x.xpath);
      }
      this.rules.push({
        name: x.name,
        xpath: x.xpath,
        match: pathToReg(x.path),
        parent: x.parent ?? ROOT,
        component: x.component,
      });
    });
  }

  public cancel() {
    // to do others.
  }

  private localLookup(
    url: string,
    parent: string
  ): Promise<MatchResult | undefined> {
    const urlObj = new URL(url, "http://locahost");
    const { pathname } = urlObj;

    console.log({ pathname });

    const item = this.rules.find((x) => {
      return x.parent == parent && (x.match(pathname) || x.match(url));
    });

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

  private async remoteLookup(
    url: string,
    parent: string
  ): Promise<MatchResult | undefined> {
    const { cache: enableCache, apiUrl, pageNotFound } = this.config;

    if (enableCache && this.cached[url]) {
      url = this.cached[url];
    }

    this.setLoading(true);

    return this.app.http
      .get(apiUrl, { params: { url } })
      .then((res) => {
        const returnUrl = (res.data?.data?.path as string) ?? pageNotFound;
        this.cached[url] = returnUrl;

        return returnUrl;
      })
      .then((url) => {
        return this.localLookup(url, parent);
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

  public async lookup(
    url: string,
    parent: string = ROOT
  ): Promise<MatchResult | undefined> {
    if (!url) {
      url = "/";
    }

    console.log("lookup", url, parent);

    let result = await this.localLookup(url, parent);

    if (!result && this.config.apiUrl) {
      result = await this.remoteLookup(url, parent);
    }

    if (!result && parent == ROOT) {
      result = await this.localLookup("/error/404", parent);
    }

    if (result && parent == ROOT) {
      this.onLocationChanged({
        key: createKey(),
        query: result.query,
        pathname: url,
        state: {},
      });
    }

    return result;
  }

  public createPath(to?: unknown): string {
    if (typeof to == "string") {
      return to;
    }
    return "/";
  }

  public push(to?: unknown) {
    const pathname = this.createPath(to);

    history.pushState(null, "", this.config.baseUrl + to);

    this.onLocationChanged({
      key: createKey(),
      pathname,
      query: {},
      state: {},
    });

    console.log({ push: pathname });
  }

  public replace(to?: unknown) {
    if (typeof to == "string") {
      history.pushState(null, "", to);
    }
  }
}

export default Router;
