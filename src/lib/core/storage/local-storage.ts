import { StorageSystem } from "./index";

export class LocalStorage implements StorageSystem {
  get<T>(key: string): T | null | unknown {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  }

  set(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
