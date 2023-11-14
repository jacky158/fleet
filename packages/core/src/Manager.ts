/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppManager } from "./types";

const KEYWORDS = [
  "_fallbacks",
  "_lazies",
  "_makeService",
  "_isCreator",
  "_allConfig",
  "bootstrap",
  "addService",
  "manager",
];

export class Manager {
  [key: string]: any;

  public manager: Manager;

  private app?: AppManager;

  /**
   * fallback services is helpful for writing test mock.
   */
  public _fallbacks: Record<string, any> = {};

  /**
   * lazy service does not make
   */
  public _lazies: Record<string, any> = {};

  public _allConfig: Record<string, any> = {};

  constructor() {
    this.manager = this as any;
  }

  public factory(): AppManager {
    const manager = new Manager();

    this.app = manager.bootstrap() as unknown as AppManager;

    return this.app;
  }

  /**
   * Bootstrap
   *
   * @returns Manager
   */
  private bootstrap() {
    if (this.app) {
      return this.app;
    }

    const handler = {
      get(manager: Manager, name: string) {
        if (manager[name]) {
          return manager[name];
        }

        manager._makeService(name);

        return manager[name];
      },
    };

    this.app = new Proxy(this, handler) as unknown as AppManager;

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

    const instance = new creator(this, this._allConfig[configName]);

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

  /**
   *
   * @param services - a dictionary of service
   * @returns  void
   */
  public addService(services: Record<string, any>) {
    if (!services) return;

    Object.keys(services).forEach((name) => {
      this._addService(name, services[name]);
    });
  }

  public static create(): AppManager {
    return new Manager().bootstrap();
  }
}

export default Manager;
