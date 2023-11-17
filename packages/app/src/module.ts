declare module "@ikx/app" {
  export interface App {
    extend(k: Record<string, unknown>): void;
    config<T = string>(name: string): T | undefined;
    config<T = string>(name: string, value: T): T;
  }
}
