import get from "lodash/get";
import { useContext } from "react";
import { createElement } from "react";
import { ReactNode } from "react";
import { createContext } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const KEYWORDS = [
  "_fallbacks",
  "_lazies",
  "_makeService",
  "_isCreator",
  "_allConfig",
  "bootstrap",
  "extend",
  "manager",
];

export interface Config {
  [key: string]: unknown;
}

export class ViewComponents {}

export class App {
  [key: string]: any;

  private app?: App;

  /**
   * fallback services is helpful for writing test mock.
   */
  private _fallbacks: Record<string, any> = {};

  /**
   * lazy service does not make
   */
  private _lazies: Record<string, any> = {};

  private _config: Record<string, any> = {};

  constructor(config?: Partial<Config>) {
    this._config = config ?? {};
  }

  /**
   * Bootstrap
   *
   * @returns Manager
   */
  public bootstrap(): App {
    if (this.app) {
      return this.app;
    }

    const handler = {
      get(manager: App, name: string) {
        if (manager[name]) {
          return manager[name];
        }

        manager._makeService(name);

        return manager[name];
      },
    };

    this.app = new Proxy(this, handler) as unknown as App;

    return this.app;
  }

  private _isCreator(x: any): boolean {
    return !!(
      x &&
      x.prototype &&
      /function/i.test(typeof x.prototype.bootstrap)
    );
  }

  /**
   *
   * @param {string} name - make a service instance
   * @returns
   */
  private _makeService(name: string) {
    if (this[name]) {
      // service is exists
      return;
    }

    let creator = this._lazies[name];

    if (!creator) {
      // console.log(`fallbacks[${name}]: ${typeof Manager.fallbacks[name]}`);
      creator = this._fallbacks[name];
    }

    if (!creator) {
      return;
    }

    if (!this._isCreator(creator)) {
      this[name] = creator;

      return;
    }

    const configName = creator.configKey ?? name;

    const instance = new creator(this, this._config[configName]);

    if (!/function/i.test(typeof instance.bootstrap)) {
      throw new Error(`${name}.bootstrap is not callable`);
    }

    const service = instance.bootstrap(this.app);

    this[name] = service ? service : instance;
  }

  /**
   * Require services
   * @param {string[]} services - list require packages
   */
  public deps(...services: string[]): void {
    services.forEach((name) => this._makeService(name));
  }

  private _addService(name: string, creator: unknown): void {
    if (KEYWORDS.includes(name)) {
      throw new Error(
        `Oop!, could not add service ${name} ${KEYWORDS.join(",")}`
      );
    }

    if (this._isCreator(creator)) {
      this[name] = undefined;
      this._lazies[name] = creator;
    } else {
      this[name] = creator;
    }
  }

  public config<T = string>(name: string, defaultValue?: T): T | undefined {
    return get(this._config, name, defaultValue);
  }

  /**
   *
   * @param services - a dictionary of service
   * @returns  void
   */
  public extend(services: Record<string, any>) {
    if (!services) return;

    Object.keys(services).forEach((name) => {
      this._addService(name, services[name]);
    });
  }
  setNavigationConfirm(blocking: boolean, data?: unknown) {
    if (blocking || data) {
      // todo here
    }
  }
}

export function createApp(): App {
  return new App().bootstrap();
}

export const Context = createContext<App>({} as unknown as App);

export function Provider({ children, app }: { children: ReactNode; app: App }) {
  return createElement(Context.Provider, { value: app }, children);
}

export function useApp(): App {
  return useContext(Context);
}
