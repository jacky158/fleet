export interface AppState {}
export interface AppManager {
  addService(services: Record<string, unknown>): void;
}
