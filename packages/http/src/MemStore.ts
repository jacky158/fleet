/** Cache in request data */
export class MemStore {
  private stored: Record<string, { ttl: number; value: unknown }> = {};

  public get<T = unknown>(id: string, data?: T): T | undefined {
    if (!this.stored[id]) {
      return data;
    }

    if (this.stored[id].ttl < new Date().getTime()) {
      delete this.stored[id];

      return data;
    }

    return this.stored[id].value as T;
  }

  public store(id: string, value: unknown, ttl: number): void {
    this.stored[id] = { ttl: new Date().getTime() + ttl * 1000, value };
  }
}

export default MemStore;
