/**
 * @type: service
 * @name: localStore
 */
export class LocalStore {
  public bootstrap() {}

  get<T = string>(name: string, value?: T): T | undefined {
    const x = localStorage.getItem(name);

    return (x === null ? value : x) as T | undefined;
  }

  public remove(name: string): void {
    localStorage.removeItem(name);
  }

  public set(name: string, value: string): void {
    localStorage.setItem(name, value);
  }
}

export default LocalStore;
